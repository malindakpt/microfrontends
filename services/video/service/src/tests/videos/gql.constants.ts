import gql from 'graphql-tag';

//TODO: Change into GraphQL fragment. Also check other projects.
export const FULL_VIDEO_PROPERTIES_SET = `
nodeId
updatedUser
updatedDate
transcodingStatus
title
subtitleLanguages
sourceSizeInBytes
sourceFileName
sourceFileExtension
dashSizeInBytes
qaStatus
outputFormat
id
finishedDate
externalId
durationInSeconds
drmKeyId
createdUser
createdDate
captionLanguages
audioLanguages
videosTags {
  nodes {
    name
  }
}
`;

export const GET_LIST_WITHOUT_VARIABLES = gql`{
    videos {
      nodes{
        ${FULL_VIDEO_PROPERTIES_SET}
      }
    }
}`;

export const CREATE = gql`mutation CreateVideo($input: CreateVideoInput!) {
    createVideo(input: $input) {
        video {
          ${FULL_VIDEO_PROPERTIES_SET}
        }
    }
}`;

export const UPDATE = gql`mutation UpdateVideo($input: UpdateVideoInput!) {
    updateVideo(input: $input) {
      video {
        ${FULL_VIDEO_PROPERTIES_SET}
      }
    }
}`;

export const GET_BY_ID = gql`query GetVideoById($id: Int!) {
    video(id: $id) {
      ${FULL_VIDEO_PROPERTIES_SET}
    }
}`;

export const DELETE_BY_ID = gql`mutation DeleteVideoById($input: DeleteVideoInput!) {
  deleteVideo(input: $input) {
    video {
      ${FULL_VIDEO_PROPERTIES_SET}
    }
    query {
      videos {
        totalCount
      }
    }
  }
}`;
