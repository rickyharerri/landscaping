import type { ServiceContent } from './types';
import { lawnCare } from './lawn-care-calgary';
import { lawnMaintenance } from './lawn-maintenance-calgary';
import { sodInstallation } from './sod-installation-calgary';
import { mulchAndRock } from './mulch-and-rock-calgary';
import { fenceAndDecks } from './fence-and-decks-calgary';
import { snowRemoval } from './snow-removal-calgary';
import { yardCleanup } from './yard-cleanup-calgary';

export const allServiceContent: ServiceContent[] = [
  lawnCare,
  lawnMaintenance,
  sodInstallation,
  mulchAndRock,
  fenceAndDecks,
  snowRemoval,
  yardCleanup,
];

export const serviceContentBySlug = (slug: string): ServiceContent | undefined =>
  allServiceContent.find((s) => s.slug === slug);

export type { ServiceContent };
