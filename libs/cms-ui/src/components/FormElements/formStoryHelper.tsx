import * as faker from 'faker';
import React, { useState } from 'react';
import { CustomTags, ReadOnlyField, Select, Tags, SingleLineText } from '.';
import { BooleanViewField } from './BooleanView/BooleanViewField';
import { DateTimeField } from './DateTime/DateTimeField';

function generateNames(amount: number): string[] {
  const users: string[] = [];
  for (let i = 1; i <= amount; i++) {
    const name = `${faker.name.firstName()} ${faker.name.lastName()}`;
    users.push(name);
  }
  return users;
}

function generateTitle(): string {
  const fakerTitle = faker.hacker.adjective().replace(/-/g, '');
  return fakerTitle.charAt(0).toUpperCase() + fakerTitle.slice(1);
}

const genresOptions = ['Crime', 'Drama', 'Thriller'];
const selectOptions = [
  { value: 'PG', label: 'PG' },
  { value: 'PG-13', label: 'PG-13' },
  { value: 'R', label: 'R' },
];

export const useCreateForm = () => {
  const [id] = useState(faker.random.uuid());
  const [title, setTitle] = useState(`The ${generateTitle()}`);
  const [genres, setGenres] = useState<string[]>(['Crime', 'Drama']);
  const [ratings, setRatings] = useState<
    string | number | string[] | undefined
  >('R');
  const [shortDescription, setShortDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [cast, setCast] = useState<string[]>(generateNames(2));
  const [status] = useState<boolean>(faker.random.boolean());
  const [createdTime] = useState<Date>(new Date());
  const [directors, setDirectors] = useState<string[]>(generateNames(3));
  const [locales, setLocales] = useState<string[]>(['en_US', 'pt_PT', 'zh_CN']);
  const [writers] = useState(generateNames(1)[0]);

  return {
    form: (
      <form>
        <ReadOnlyField label="Id" value={id} />
        <SingleLineText
          name="title"
          label="Title"
          value={title}
          onChange={e => setTitle(e.currentTarget.value)}
        />
        <ReadOnlyField label="Publish State" value="PUBLISHED" />
        <BooleanViewField
          label="Status"
          value={status}
          trueLabel="Enabled"
          falseLabel="Disabled"
        />
        <Tags
          name="genres"
          label="Genre(s)"
          value={genres}
          tagsOptions={genresOptions}
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          //@ts-ignore
          onChange={e => setGenres(e.currentTarget.value)}
        />
        <Select
          name="ratings"
          label="Rating"
          value={ratings}
          options={selectOptions}
          onChange={e => setRatings(e.currentTarget.value)}
        />
        <SingleLineText
          name="shortDescription"
          label="Short Description"
          value={shortDescription}
          placeholder="Enter a short description..."
          onChange={e => setShortDescription(e.currentTarget.value)}
        />
        <SingleLineText
          name="longDescription"
          label="Long Description"
          value={longDescription}
          placeholder="Enter a description..."
          onChange={e => setLongDescription(e.currentTarget.value)}
        />
        <CustomTags
          name="cast"
          value={cast}
          label="Cast"
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          //@ts-ignore
          onChange={e => setCast(e.currentTarget.value)}
        />
        <CustomTags
          name="directors"
          value={directors}
          label="Director(s)"
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          //@ts-ignore
          onChange={e => setDirectors(e.currentTarget.value)}
        />
        <Tags
          name="locales"
          value={locales}
          label="Locale(s)"
          tagsOptions={['en_US', 'pt_PT', 'zh_CN']}
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          //@ts-ignore
          onChange={e => setLocales(e.currentTarget.value)}
        />
        <DateTimeField label="Created At" value={createdTime} />
        <ReadOnlyField label="Writer(s)" value={writers} />
      </form>
    ),
    title,
  };
};
