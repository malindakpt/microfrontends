import { gql, makeExtendSchemaPlugin } from 'graphile-utils';

import { TranscodingStatus, Video } from '../generated/types';

export const OverallProgressPlugin = makeExtendSchemaPlugin(() => {
  return {
    typeDefs: gql`
      extend type Video {
        overallProgress: Float!
          @requires(
            columns: [
              "transcoding_status"
              "acquisition_progress"
              "encoding_progress"
            ]
          )
      }
    `,
    resolvers: {
      Video: {
        overallProgress: async (video: Video) => {
          if (video.transcodingStatus === TranscodingStatus.Ready) return 100;

          const acquisition = (video.acquisitionProgress ?? 0) * 0.15;
          const encoding = (video.encodingProgress ?? 0) * 0.7;
          return (acquisition + encoding).toFixed(2);
        },
      },
    },
  };
});
