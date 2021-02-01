## Info

- There are several populate plugins in this folder, which populate database
  with sample data using faker library to generate fake values
- Each plugin has a `count` input parameter to specify how many assets should be
  generated
- populateMovies - generates movies and all relations, except for collection
  relations
  - seeds database with default movie_genres if no genres exist
- populateTvshows - generates tvshows and all relations, except for collection
  relations
  - also generates from 0 to 15 seasons for each generated tvshow with all
    relations, except for collection relation
    - also generates from 0 to 50 episodes for each generated season with all
      relations, except for collection relation
  - seeds database with default tvshow_genres if no genres exist
- populateCollections - generates collections and all relations
  - if collection is MANUAL - generates collectionRelations using ids of movies,
    tvshows, seasons and episodes which already exist in the database
    - meaning to generate fully populated collections - populateMovies and
      populateTvshows must be ran beforehand
  - if collection is AUTOMATIC - automaticCollectionSortKey will not be null and
    automaticCollectionsFilters will be populated instead of collectionRelations
