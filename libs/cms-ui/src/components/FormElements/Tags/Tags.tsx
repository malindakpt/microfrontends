import clsx from 'clsx';
import { noop } from 'helpers/utils';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { BaseFormControl, BaseSelectEvents } from '../Form.models';
import classes from './Tags.scss';

export interface TagsProps extends BaseFormControl, BaseSelectEvents {
  /** If set, sets the form control value */
  value?: string[];
  /** Array of options that can be selected from */
  tagsOptions?: string[];
  /** Array of options that are mandatory to select */
  requiredOptions?: string[];
  /** Optional Drop down label (default: '')*/
  dropDownLabel?: string;
  /** Whether or not the control should start focused (default: false) */
  autoFocus?: boolean;
}

export const Tags: React.FC<TagsProps> = ({
  id,
  name,
  label,
  value = [],
  dropDownLabel = '',
  tagsOptions = [],
  requiredOptions = [],
  disabled = false,
  error = undefined,
  autoFocus = false,
  onChange = noop,
  onBlur,
  onFocus,
}) => {
  const [currentTags, setCurrentTags] = useState<string[]>(value); // Current tags the user has selected
  const ref = useRef<FormEvent<HTMLSelectElement>>();

  useEffect(() => {
    setCurrentTags(value);
  }, [value]);

  const errorMsg: string | undefined = error;

  useEffect(() => {
    // Only emit if there is a current event
    if (ref.current) {
      onChange({
        ...ref.current,

        currentTarget: { value: (currentTags as unknown) as string },
      } as React.FormEvent<HTMLSelectElement>);

      // Resets event data
      ref.current = undefined;
    }
  }, [currentTags, onChange]);

  /**
   * Adds a tag to currently selected list
   * @param e Select FormEvent
   */
  function addTag(e: FormEvent<HTMLSelectElement>): void {
    const newTag = e.currentTarget.value;

    // Set event data
    ref.current = e;

    setCurrentTags(prevState => [...prevState, newTag]);
  }

  /**
   * Removes tags from currently selected tags
   * @param idx index of tag to be filtered
   * @param e Event
   */
  function removeTag(idx: number, e: unknown): void {
    // Set event data
    ref.current = e as FormEvent<HTMLSelectElement>;

    setCurrentTags(prevState =>
      prevState.filter((_: string, i: number) => i !== idx),
    );
  }

  /**
   * Checks whether this tag is included in required tags list
   * @param tag text of the tag
   */
  function isRequired(tag: string): boolean {
    for (const option of requiredOptions) {
      if (option === tag) {
        return true;
      }
    }
    return false;
  }

  return (
    <div className={classes.container}>
      <label>{label}</label>
      <div className={classes.tagsWrapper}>
        {currentTags.map((tag, idx) => {
          return (
            <span key={tag} className={classes.selectedItem}>
              {tag}
              {!isRequired(tag) && (
                <svg
                  viewBox="0 0 10 10"
                  onClick={e => {
                    e.persist();
                    removeTag(idx, e);
                  }}
                >
                  <polygon points="10 1.53 8.47 0 5 3.47 1.53 0 0 1.53 3.47 5 0 8.47 1.53 10 5 6.53 8.47 10 10 8.47 6.53 5 10 1.53" />
                </svg>
              )}
            </span>
          );
        })}
        <select
          className={clsx({ [classes.hasError]: errorMsg })}
          id={id}
          name={name}
          disabled={disabled}
          autoFocus={autoFocus}
          onBlur={onBlur}
          onFocus={onFocus}
          onChange={e => {
            e.persist();
            addTag(e);
          }}
          hidden={currentTags.length === tagsOptions.length}
        >
          {[
            <option key={'eae2713d-1a32-4bdb-8f87-c7e1f7e2a3b2'} value={''}>
              {dropDownLabel}
            </option>,
          ].concat(
            tagsOptions
              .filter((currentTag: string) => {
                return !currentTags.includes(currentTag);
              })
              .map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              )),
          )}
        </select>
      </div>
      {errorMsg && <small>{errorMsg}</small>}
    </div>
  );
};
