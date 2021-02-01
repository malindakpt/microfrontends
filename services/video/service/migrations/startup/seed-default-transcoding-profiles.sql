DO $$
DECLARE
    acquisition_profiles_count INTEGER;
    publishing_profiles_count INTEGER;
    processing_profiles_count INTEGER;
BEGIN
  -- Check if at least 1 Acquisition profile exist
  SELECT COUNT(id) INTO acquisition_profiles_count FROM app_public.transcoding_acquisition_profiles;

  IF acquisition_profiles_count < 1 THEN
    -- Create Default Acquisition profile
    PERFORM set_config('ax.claims.username', 'CMS', TRUE);
    INSERT INTO app_public.transcoding_acquisition_profiles (title, provider)
    VALUES ('DEFAULT', 'AzureBlob');
  END IF;

  -- Check if at least 1 Publishing profile exist
  SELECT COUNT(id) INTO publishing_profiles_count FROM app_public.transcoding_publishing_profiles;

  IF publishing_profiles_count < 1 THEN
    -- Create Default Publishing profile
    PERFORM set_config('ax.claims.username', 'CMS', TRUE);
    INSERT INTO app_public.transcoding_publishing_profiles (title, provider)
    VALUES ('DEFAULT', 'AzureBlob');
  END IF;

  -- Check if at least 1 Processing profile exist
  SELECT COUNT(id) INTO processing_profiles_count FROM app_public.transcoding_processing_profiles;

  IF processing_profiles_count < 1 THEN
    -- Create Default Processing profile
    PERFORM set_config('ax.claims.username', 'CMS', TRUE);
    INSERT INTO app_public.transcoding_processing_profiles (title, video_stream_expression, audio_file_language_expression, subtitle_file_language_expression, caption_file_language_expression)
    VALUES ('DEFAULT', '^.*\.(mp4|avi|mov|wma|mkv|webm|ts)$', '^[^-]*-([a-zA-Z0-9\-]+).(aac|ac3|flac|mp2|mp3|ogg|wav|wma|aiff)$', '^[^-]*-sub-([a-zA-Z0-9\-]+).(vtt|srt|ttml|pac|mp4)$', '^[^-]*-cc-([a-zA-Z0-9\-]+).(vtt|ttml|srt)$');
  END IF;
END $$;
