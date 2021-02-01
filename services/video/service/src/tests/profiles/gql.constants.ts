import gql from 'graphql-tag';

const TEST_PROPERTIES_FRAGMENT = `
  isValid
`;

export const ACQUISITION_PROFILES_WITHOUT_VARIABLES = gql`
  {
    transcodingAcquisitionProfiles {
      nodes {
        ${TEST_PROPERTIES_FRAGMENT}
      }
    }
  }
  
`;

export const PROCESSING_PROFILES_WITHOUT_VARIABLES = gql`
  {
    transcodingProcessingProfiles {
      nodes {
        ${TEST_PROPERTIES_FRAGMENT}
      }
    }
  }
`;

export const UPDATE_ACQUISITION_PROFILE = gql`
  mutation UpdateTranscodingAcquisitionProfile(
    $input: UpdateTranscodingAcquisitionProfileInput!
  ) {
    updateTranscodingAcquisitionProfile(input: $input) {
      transcodingAcquisitionProfile {
        ${TEST_PROPERTIES_FRAGMENT}
      }
    }
  }
`;

export const UPDATE_PROCESSING_PROFILE = gql`
  mutation UpdateTranscodingProcessingProfile(
    $input: UpdateTranscodingProcessingProfileInput!
  ) {
    updateTranscodingProcessingProfile(input: $input) {
      transcodingProcessingProfile {
        ${TEST_PROPERTIES_FRAGMENT}
      }
    }
  }
`;
