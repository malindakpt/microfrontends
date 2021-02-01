import * as request from 'superagent';
import * as urljoin from 'url-join';

import { UnreachableCaseError } from '../common';
import {
  Archiving,
  DrmProtection,
  OutputFormat,
  TranscodingAcquisitionProfile,
  TranscodingProcessingProfile,
  TranscodingPublishingProfile,
} from '../generated/types';

export interface IProfilesData {
  acquisitionProfile: TranscodingAcquisitionProfile;
  processingProfile: TranscodingProcessingProfile;
  publishingProfile: TranscodingPublishingProfile;
}

interface IVipSuccessResponse {
  jobId: string;
  keyId?: string;
}

const getOutputFormatValue = (outputFormat: OutputFormat): string[] => {
  switch (outputFormat) {
    case OutputFormat.HlsDash:
      return ['Hls', 'Dash']; //Hls - FairPlay, Dash - Widevine and PlayReady
    case OutputFormat.Hls:
      return ['Hls']; // FairPlay
    case OutputFormat.Dash:
      return ['Dash']; // Widevine and PlayReady
    case OutputFormat.Cmaf:
      return ['Cmaf']; // FairPlay, Widevine and PlayReady
    default:
      throw new UnreachableCaseError(outputFormat);
  }
};

const getDrmProtectionValue = (drmProtection: DrmProtection): string => {
  switch (drmProtection) {
    case DrmProtection.None:
      return 'None';
    case DrmProtection.Managed:
      return 'Managed';
    default:
      throw new UnreachableCaseError(drmProtection);
  }
};

const getArchivingValue = (archiving: Archiving): string => {
  switch (archiving) {
    case Archiving.None:
      return 'None';
    case Archiving.Tar:
      return 'Tar';
    case Archiving.SingleTar:
      return 'SingleTar';
    default:
      throw new UnreachableCaseError(archiving);
  }
};

const getVipJobBody = (
  videoRelativePath: string,
  externalId: string,
  vipServiceBusConnection: string,
  profilesData: IProfilesData,
): any => {
  const {
    acquisitionProfile,
    processingProfile,
    publishingProfile,
  } = profilesData;
  const encrypted = 'Encrypted';
  const body = {
    ExternalId: externalId,
    MessagePublishers: [
      {
        Type: 'AzureServiceBusQueue',
        Connection: vipServiceBusConnection,
        Format: 'json',
        CredentialsProtection: encrypted,
      },
    ],
    ContentAcquisition: {
      Provider: acquisitionProfile.provider,
      UriPath: urljoin(acquisitionProfile.uriPath, videoRelativePath),
      CredentialsName: acquisitionProfile.readCredentialsName,
      CredentialsSecret: acquisitionProfile.readCredentialsSecret,
      CredentialsProtection: encrypted,
    },
    MediaMappings: {
      VideoStreamExpression: processingProfile.videoStreamExpression,
      AudioFileLanguageExpression:
        processingProfile.audioFileLanguageExpression,
      SubtitleFileLanguageExpression:
        processingProfile.subtitleFileLanguageExpression,
      CaptionFileLanguageExpression:
        processingProfile.captionFileLanguageExpression,
    },
    ContentProcessing: {
      OutputFormat: getOutputFormatValue(processingProfile.outputFormat),
      VideoFormat: 'H264',
      OptimizeFor: 'Balance',
      DrmProtection: getDrmProtectionValue(processingProfile.drmProtection),
      UseNativeLanguageNames: processingProfile.useNativeLanguageNames,
      VideoRepresentations:
        processingProfile.transcodingVideoRepresentations.nodes,
      Archiving: getArchivingValue(processingProfile.archiving),
      DrmManaged: null,
      DeleteFilesFromSourceWhenDone:
        processingProfile.deleteFilesFromSourceWhenDone,
    },
    ContentPublishing: {
      Provider: publishingProfile.provider,
      UriPath: urljoin(publishingProfile.uriPath, externalId),
      CredentialsName: publishingProfile.credentialsName,
      CredentialsSecret: publishingProfile.credentialsSecret,
      CredentialsProtection: encrypted,
    },
  };

  if (processingProfile.drmProtection === DrmProtection.Managed) {
    body.ContentProcessing.DrmManaged = {
      ApiUrl: processingProfile.drmApiUrl,
      TenantId: processingProfile.drmTenantId,
      ManagementKey: processingProfile.drmManagementKey,
      KeySeed: processingProfile.drmKeySeed,
      Thumbprints: processingProfile.drmThumbprints,
      KeysProtection: encrypted,
    };
  }

  return body;
};

export const startVipJob = async (
  videoRelativePath: string,
  externalId: string,
  profilesData: IProfilesData,
  vipServiceBusConnection: string,
  vipJobUrl: string,
  vipAuthHeader: string,
): Promise<IVipSuccessResponse> => {
  const jobBody = getVipJobBody(
    videoRelativePath,
    externalId,
    vipServiceBusConnection,
    profilesData,
  );
  const result = await request
    .post(vipJobUrl)
    .set('Authorization', vipAuthHeader)
    .send(jobBody);

  if (result?.body?.JobId === null) {
    throw new Error(`VIP API request to start encoding job has failed`);
  }

  return { jobId: result.body.JobId, keyId: result.body.KeyId };
};
