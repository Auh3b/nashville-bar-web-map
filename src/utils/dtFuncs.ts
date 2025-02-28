import { group } from 'd3-array';
import { Bars, BarsItemProperty, Categories, Category } from './store.types';
import { featureCollection } from '@turf/turf';

export function getCategoryTree(data: BarsItemProperty[]) {
  const output: Categories = {};

  const grouping = group(
    data,
    (v) => v.primary,
    (d) => d.secondary,
  ).entries();

  for (let [c_key, c_value] of grouping) {
    const _output: Category = {
      value: c_key,
      label: c_key,
      checked: true,
      subs: {},
    };

    for (let [s_key] of c_value) {
      if (s_key) {
        const _s_ouput = {
          value: s_key,
          label: s_key,
          checked: true,
        };
        // @ts-ignore
        _output.subs[s_key] = _s_ouput;
      }
    }

    if (!Object.keys(_output.subs || {}).length) {
      delete _output.subs;
    }

    output[c_key] = _output;
  }

  return output;
}

export function getFiltersFromCategories(cat?: Categories) {
  if (!cat) return null;
  let primary_filters: string[] = [];
  let secondary_filters: string[] = [];
  for (let prime of Object.values(cat)) {
    const { checked, subs, value } = prime;
    if (!checked) {
      primary_filters = [...primary_filters, value];
    }

    if (!subs) continue;
    for (let sec of Object.values(subs)) {
      const { checked, value } = sec;
      if (!checked) {
        secondary_filters = [...secondary_filters, value];
      }
    }
  }
  return [primary_filters, secondary_filters];
}

export function processCategoryFilters(data: Bars, filters: string[][] | null) {
  if (!filters) return data;
  const [p_filters, s_filters] = filters;
  let features = data.features;

  features = features.filter(
    ({ properties }) => !p_filters.includes(properties.primary),
  );
  features = features.filter(
    ({ properties }) => !s_filters.includes(properties?.secondary || ''),
  );

  return featureCollection(features);
}
