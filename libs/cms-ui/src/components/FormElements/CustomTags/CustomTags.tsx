import clsx from 'clsx';
import { noop } from 'helpers/utils';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { BaseFormControl, BaseInputEvents } from '../Form.models';
import classes from './CustomTags.scss';

export interface CustomTagsProps extends BaseFormControl, BaseInputEvents {
  /** Input element type (default: 'text')*/
  type?: string;
  /** If set, sets the form control value */
  value?: string[];
  /** Input placeholder */
  placeholder?: string;
  /** Whether or not the control should start focused (default: false) */
  autoFocus?: boolean;
  /** Whether or not the control supports auto complete */
  autoComplete?: 'on' | 'off';
  /** Whether or not the values displays inline or as rows */
  displayAsRows?: boolean;
}

export const CustomTags: React.FC<CustomTagsProps> = ({
  id,
  name,
  type = 'text',
  label,
  value = [],
  disabled = false,
  placeholder,
  error = undefined,
  autoFocus = false,
  autoComplete,
  onChange = noop,
  onBlur,
  displayAsRows = false,
  onFocus,
}) => {
  const [currentTags, setCurrentTags] = useState<string[]>(value); // Current tags the user has selected
  const ref = useRef<FormEvent<HTMLInputElement>>();

  useEffect(() => {
    setCurrentTags(current => (current === value ? current : value));
  }, [value]);

  const errorMsg: string | undefined = error;
  const styles = { display: displayAsRows ? 'grid' : 'block' };

  useEffect(() => {
    // Only emit if there is a current event
    if (ref.current) {
      onChange({
        ...ref.current,

        currentTarget: { value: (currentTags as unknown) as string },
      } as React.FormEvent<HTMLInputElement>);

      // Resets event data
      ref.current = undefined;
    }
  }, [currentTags, onChange]);

  /**
   * Adds a tag to currently selected list
   * @param e Select FormEvent
   */
  function addTag(e: FormEvent<HTMLInputElement>): void {
    const newTag = e.currentTarget.value.trim();
    // If the new tag is an empty string OR a duplicate, don't add the tag
    if (newTag === '' || currentTags.includes(newTag)) {
      return;
    }

    // Set event data
    ref.current = e;

    setCurrentTags(prevState => [...prevState, newTag]);

    // Reset input
    e.currentTarget.value = '';
  }

  /**
   * Removes tags from currently selected tags
   * @param idx index of tag to be filtered
   * @param e Event
   */
  function removeTag(idx: number, e: unknown): void {
    // Set event data
    ref.current = e as FormEvent<HTMLInputElement>;

    setCurrentTags(prevState =>
      prevState.filter((_: string, i: number) => i !== idx),
    );
  }

  return (
    <div className={classes.container}>
      <label>{label}</label>
      <div className={classes.tagsWrapper} style={styles}>
        {currentTags?.map((tag, idx) => {
          return (
            <span key={tag} className={classes.selectedItem}>
              {tag}
              <svg
                viewBox="0 0 10 10"
                onClick={e => {
                  e.persist();
                  removeTag(idx, e);
                }}
              >
                <polygon points="10 1.53 8.47 0 5 3.47 1.53 0 0 1.53 3.47 5 0 8.47 1.53 10 5 6.53 8.47 10 10 8.47 6.53 5 10 1.53" />
              </svg>
            </span>
          );
        })}
        <input
          className={clsx({ [classes.hasError]: errorMsg })}
          id={id}
          name={name}
          type={type}
          disabled={disabled}
          placeholder={placeholder}
          autoFocus={autoFocus}
          autoComplete={autoComplete}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.persist();
              addTag(e);
            }
          }}
          onBlur={e => {
            e.persist();
            addTag(e);
          }}
          onFocus={onFocus}
        />
      </div>
      {errorMsg && <small>{errorMsg}</small>}
    </div>
  );
};
