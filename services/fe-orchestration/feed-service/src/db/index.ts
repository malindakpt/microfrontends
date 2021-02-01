import { Pilet } from '../types';
import PiletData from './entities/piletData.entity';
import { getRepository } from 'typeorm';

export async function getPilets(): Promise<Array<Pilet>> {
  const piletDataRepository = getRepository(PiletData);
  const pilets: Array<Pilet> = [];
  const piletData = await piletDataRepository.find();

  piletData.forEach(dataElement => {
    pilets.push(dataElement.pilet);
  });

  return pilets;
}

export async function getPilet(name: string, version: string): Promise<Pilet | undefined> {
  const piletDataRepository = getRepository(PiletData);
  const piletData = await piletDataRepository.findOne({name, version});

  return piletData.pilet;
}

export async function setPilet(pilet: Pilet) {
  const piletDataRepository = getRepository(PiletData);
  
  await piletDataRepository.save({name: pilet.meta.name, version: pilet.meta.version, pilet});
}
