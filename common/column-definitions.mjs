import * as table_constants from 'react-table/src/constants.mjs'
import column_categories from './column-categories.mjs'

export const election_results_single_year = {
  values: [2024],
  data_type: table_constants.TABLE_DATA_TYPES.SELECT,
  single: true,
  default_value: 2024,
  enable_multi_on_split: ['year']
}

export const weather_single_year = {
  values: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
  data_type: table_constants.TABLE_DATA_TYPES.SELECT,
  single: true,
  default_value: 2024,
  enable_multi_on_split: ['year']
}

export const column_definitions = [
  {
    column_id: 'ogc_fid',
    column_name: 'ogc_fid',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'ogc_fid',
    header_label: 'ogc_fid',
    column_groups: [column_categories.PROPERTY, column_categories.PARCEL_ID]
  },
  {
    column_id: 'road_km',
    column_name: 'road_km',
    table_name: 'parcels_road',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'road_km',
    header_label: 'road_km',
    column_groups: [
      column_categories.POLLUTION,
      column_categories.DISTANCE_TO_ROAD
    ]
  },
  {
    column_id: 'paved_km',
    column_name: 'paved_km',
    table_name: 'parcels_road',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'paved_km',
    header_label: 'paved_km',
    column_groups: [
      column_categories.POLLUTION,
      column_categories.DISTANCE_TO_ROAD
    ]
  },
  {
    column_id: 'high_traffic_km',
    column_name: 'high_traffic_km',
    table_name: 'parcels_road',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'high_traffic_km',
    header_label: 'high_traffic_km',
    column_groups: [
      column_categories.POLLUTION,
      column_categories.DISTANCE_TO_ROAD
    ]
  },
  {
    column_id: 'highway_km',
    column_name: 'highway_km',
    table_name: 'parcels_road',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'highway_km',
    header_label: 'highway_km',
    column_groups: [
      column_categories.POLLUTION,
      column_categories.DISTANCE_TO_ROAD
    ]
  },
  {
    column_id: 'latitude',
    column_name: 'latitude',
    table_name: 'parcels_viewshed',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'latitude',
    header_label: 'latitude',
    column_groups: [column_categories.LOCATION, column_categories.COORDINATES]
  },
  {
    column_id: 'longitude',
    column_name: 'longitude',
    table_name: 'parcels_viewshed',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'longitude',
    header_label: 'longitude',
    column_groups: [column_categories.LOCATION, column_categories.COORDINATES]
  },
  {
    column_id: 'viewshed_percentage',
    column_name: 'viewshed_percentage',
    table_name: 'parcels_viewshed',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'viewshed_percentage',
    header_label: 'viewshed_percentage',
    column_groups: [column_categories.VIEWSHED]
  },
  {
    column_id: 'viewshed_index',
    column_name: 'viewshed_index',
    table_name: 'parcels_viewshed',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'viewshed_index',
    header_label: 'viewshed_index',
    column_groups: [column_categories.VIEWSHED]
  },
  {
    column_id: 'viewshed_index_under_2km',
    column_name: 'viewshed_index_under_2km',
    table_name: 'parcels_viewshed',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'viewshed_index_under_2km',
    header_label: 'viewshed_index_under_2km',
    column_groups: [column_categories.VIEWSHED]
  },
  {
    column_id: 'viewshed_index_2km',
    column_name: 'viewshed_index_2km',
    table_name: 'parcels_viewshed',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'viewshed_index_2km',
    header_label: 'viewshed_index_2km',
    column_groups: [column_categories.VIEWSHED]
  },
  {
    column_id: 'viewshed_index_5km',
    column_name: 'viewshed_index_5km',
    table_name: 'parcels_viewshed',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'viewshed_index_5km',
    header_label: 'viewshed_index_5km',
    column_groups: [column_categories.VIEWSHED]
  },
  {
    column_id: 'viewshed_index_10km',
    column_name: 'viewshed_index_10km',
    table_name: 'parcels_viewshed',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'viewshed_index_10km',
    header_label: 'viewshed_index_10km',
    column_groups: [column_categories.VIEWSHED]
  },
  {
    column_id: 'viewshed_index_20km',
    column_name: 'viewshed_index_20km',
    table_name: 'parcels_viewshed',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'viewshed_index_20km',
    header_label: 'viewshed_index_20km',
    column_groups: [column_categories.VIEWSHED]
  },
  {
    column_id: 'viewshed_index_50km',
    column_name: 'viewshed_index_50km',
    table_name: 'parcels_viewshed',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'viewshed_index_50km',
    header_label: 'viewshed_index_50km',
    column_groups: [column_categories.VIEWSHED]
  },
  {
    column_id: 'viewshed_index_75km',
    column_name: 'viewshed_index_75km',
    table_name: 'parcels_viewshed',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'viewshed_index_75km',
    header_label: 'viewshed_index_75km',
    column_groups: [column_categories.VIEWSHED]
  },
  {
    column_id: 'viewshed_nw',
    column_name: 'viewshed_nw',
    table_name: 'parcels_viewshed',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'viewshed_nw',
    header_label: 'viewshed_nw',
    column_groups: [column_categories.VIEWSHED]
  },
  {
    column_id: 'viewshed_sw',
    column_name: 'viewshed_sw',
    table_name: 'parcels_viewshed',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'viewshed_sw',
    header_label: 'viewshed_sw',
    column_groups: [column_categories.VIEWSHED]
  },
  {
    column_id: 'viewshed_se',
    column_name: 'viewshed_se',
    table_name: 'parcels_viewshed',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'viewshed_se',
    header_label: 'viewshed_se',
    column_groups: [column_categories.VIEWSHED]
  },
  {
    column_id: 'viewshed_ne',
    column_name: 'viewshed_ne',
    table_name: 'parcels_viewshed',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'viewshed_ne',
    header_label: 'viewshed_ne',
    column_groups: [column_categories.VIEWSHED]
  },
  {
    column_id: 'viewshed_n',
    column_name: 'viewshed_n',
    table_name: 'parcels_viewshed',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'viewshed_n',
    header_label: 'viewshed_n',
    column_groups: [column_categories.VIEWSHED]
  },
  {
    column_id: 'viewshed_e',
    column_name: 'viewshed_e',
    table_name: 'parcels_viewshed',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'viewshed_e',
    header_label: 'viewshed_e',
    column_groups: [column_categories.VIEWSHED]
  },
  {
    column_id: 'viewshed_s',
    column_name: 'viewshed_s',
    table_name: 'parcels_viewshed',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'viewshed_s',
    header_label: 'viewshed_s',
    column_groups: [column_categories.VIEWSHED]
  },
  {
    column_id: 'viewshed_w',
    column_name: 'viewshed_w',
    table_name: 'parcels_viewshed',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'viewshed_w',
    header_label: 'viewshed_w',
    column_groups: [column_categories.VIEWSHED]
  },
  {
    column_id: 'struct',
    column_name: 'struct',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.BOOLEAN,
    accessorKey: 'struct',
    header_label: 'struct',
    column_groups: [column_categories.PROPERTY, column_categories.STRUCTURE]
  },
  {
    column_id: 'multistruct',
    column_name: 'multistruct',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.BOOLEAN,
    accessorKey: 'multistruct',
    header_label: 'multistruct',
    column_groups: [column_categories.PROPERTY, column_categories.STRUCTURE]
  },
  {
    column_id: 'structno',
    column_name: 'structno',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'structno',
    header_label: 'structno',
    column_groups: [column_categories.PROPERTY, column_categories.STRUCTURE]
  },
  {
    column_id: 'yearbuilt',
    column_name: 'yearbuilt',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'yearbuilt',
    header_label: 'yearbuilt',
    column_groups: [column_categories.PROPERTY, column_categories.STRUCTURE]
  },
  {
    column_id: 'numstories',
    column_name: 'numstories',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'numstories',
    header_label: 'numstories',
    column_groups: [column_categories.PROPERTY, column_categories.STRUCTURE]
  },
  {
    column_id: 'numunits',
    column_name: 'numunits',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'numunits',
    header_label: 'numunits',
    column_groups: [column_categories.PROPERTY, column_categories.STRUCTURE]
  },
  {
    column_id: 'improvval',
    column_name: 'improvval',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'improvval',
    header_label: 'improvval',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'landval',
    column_name: 'landval',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'landval',
    header_label: 'landval',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'parval',
    column_name: 'parval',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'parval',
    header_label: 'parval',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'agval',
    column_name: 'agval',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'agval',
    header_label: 'agval',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'saleprice',
    column_name: 'saleprice',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'saleprice',
    header_label: 'saleprice',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'saledate',
    column_name: 'saledate',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.DATE,
    accessorKey: 'saledate',
    header_label: 'saledate',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'taxamt',
    column_name: 'taxamt',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'taxamt',
    header_label: 'taxamt',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'lat',
    column_name: 'lat',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'lat',
    header_label: 'lat',
    column_groups: [column_categories.LOCATION, column_categories.COORDINATES]
  },
  {
    column_id: 'lon',
    column_name: 'lon',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'lon',
    header_label: 'lon',
    column_groups: [column_categories.LOCATION, column_categories.COORDINATES]
  },
  {
    column_id: 'sourcedate',
    column_name: 'sourcedate',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.DATE,
    accessorKey: 'sourcedate',
    header_label: 'sourcedate',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'recrdareano',
    column_name: 'recrdareano',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'recrdareano',
    header_label: 'recrdareano',
    column_groups: [column_categories.PROPERTY, column_categories.PARCEL_AREA]
  },
  {
    column_id: 'gisacre',
    column_name: 'gisacre',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'gisacre',
    header_label: 'gisacre',
    column_groups: [column_categories.PROPERTY, column_categories.PARCEL_AREA]
  },
  {
    column_id: 'sqft',
    column_name: 'sqft',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'sqft',
    header_label: 'sqft',
    column_groups: [column_categories.PROPERTY, column_categories.PARCEL_AREA]
  },
  {
    column_id: 'll_gisacre',
    column_name: 'll_gisacre',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'll_gisacre',
    header_label: 'll_gisacre',
    column_groups: [column_categories.PROPERTY, column_categories.PARCEL_AREA]
  },
  {
    column_id: 'll_gissqft',
    column_name: 'll_gissqft',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'll_gissqft',
    header_label: 'll_gissqft',
    column_groups: [column_categories.PROPERTY, column_categories.PARCEL_AREA]
  },
  {
    column_id: 'll_bldg_footprint_sqft',
    column_name: 'll_bldg_footprint_sqft',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'll_bldg_footprint_sqft',
    header_label: 'll_bldg_footprint_sqft',
    column_groups: [column_categories.PROPERTY, column_categories.STRUCTURE]
  },
  {
    column_id: 'll_bldg_count',
    column_name: 'll_bldg_count',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'll_bldg_count',
    header_label: 'll_bldg_count',
    column_groups: [column_categories.PROPERTY, column_categories.STRUCTURE]
  },
  {
    column_id: 'cdl_majority_percent',
    column_name: 'cdl_majority_percent',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'cdl_majority_percent',
    header_label: 'cdl_majority_percent',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'revisedate',
    column_name: 'revisedate',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.DATE,
    accessorKey: 'revisedate',
    header_label: 'revisedate',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'll_updated_at',
    column_name: 'll_updated_at',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.DATE,
    accessorKey: 'll_updated_at',
    header_label: 'll_updated_at',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'usps_vacancy_date',
    column_name: 'usps_vacancy_date',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.DATE,
    accessorKey: 'usps_vacancy_date',
    header_label: 'usps_vacancy_date',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'lbcs_activity',
    column_name: 'lbcs_activity',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'lbcs_activity',
    header_label: 'lbcs_activity',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'lbcs_function',
    column_name: 'lbcs_function',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'lbcs_function',
    header_label: 'lbcs_function',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'lbcs_structure',
    column_name: 'lbcs_structure',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'lbcs_structure',
    header_label: 'lbcs_structure',
    column_groups: [column_categories.PROPERTY, column_categories.STRUCTURE]
  },
  {
    column_id: 'lbcs_site',
    column_name: 'lbcs_site',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'lbcs_site',
    header_label: 'lbcs_site',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'lbcs_ownership',
    column_name: 'lbcs_ownership',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'lbcs_ownership',
    header_label: 'lbcs_ownership',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'reviseddate',
    column_name: 'reviseddate',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.DATE,
    accessorKey: 'reviseddate',
    header_label: 'reviseddate',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'zoning_change_date',
    column_name: 'zoning_change_date',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.DATE,
    accessorKey: 'zoning_change_date',
    header_label: 'zoning_change_date',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'rzrealdat',
    column_name: 'rzrealdat',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.DATE,
    accessorKey: 'rzrealdat',
    header_label: 'rzrealdat',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'width',
    column_name: 'width',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'width',
    header_label: 'width',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'depth',
    column_name: 'depth',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'depth',
    header_label: 'depth',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'lastinsp',
    column_name: 'lastinsp',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.DATE,
    accessorKey: 'lastinsp',
    header_label: 'lastinsp',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'lastassd',
    column_name: 'lastassd',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.DATE,
    accessorKey: 'lastassd',
    header_label: 'lastassd',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'agfndarea',
    column_name: 'agfndarea',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'agfndarea',
    header_label: 'agfndarea',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'entzndat',
    column_name: 'entzndat',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.DATE,
    accessorKey: 'entzndat',
    header_label: 'entzndat',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'entznassm',
    column_name: 'entznassm',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'entznassm',
    header_label: 'entznassm',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'plndevdat',
    column_name: 'plndevdat',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.DATE,
    accessorKey: 'plndevdat',
    header_label: 'plndevdat',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'nprctstdat',
    column_name: 'nprctstdat',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.DATE,
    accessorKey: 'nprctstdat',
    header_label: 'nprctstdat',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'nprcarea',
    column_name: 'nprcarea',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'nprcarea',
    header_label: 'nprcarea',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'homqldat',
    column_name: 'homqldat',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.DATE,
    accessorKey: 'homqldat',
    header_label: 'homqldat',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'resident',
    column_name: 'resident',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'resident',
    header_label: 'resident',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'resi2010',
    column_name: 'resi2010',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'resi2010',
    header_label: 'resi2010',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'resi2000',
    column_name: 'resi2000',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'resi2000',
    header_label: 'resi2000',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'resi1990',
    column_name: 'resi1990',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'resi1990',
    header_label: 'resi1990',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'resiuths',
    column_name: 'resiuths',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'resiuths',
    header_label: 'resiuths',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'aprtment',
    column_name: 'aprtment',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'aprtment',
    header_label: 'aprtment',
    column_groups: [column_categories.PROPERTY, column_categories.STRUCTURE]
  },
  {
    column_id: 'trailer',
    column_name: 'trailer',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'trailer',
    header_label: 'trailer',
    column_groups: [column_categories.PROPERTY, column_categories.STRUCTURE]
  },
  {
    column_id: 'special',
    column_name: 'special',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'special',
    header_label: 'special',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'other',
    column_name: 'other',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'other',
    header_label: 'other',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'plant_hardiness_updated',
    column_name: 'plant_hardiness_updated',
    table_name: 'parcels_agriculture',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'plant_hardiness_updated',
    header_label: 'plant_hardiness_updated',
    column_groups: [
      column_categories.AGRICULTURE,
      column_categories.PLANT_HARDINESS
    ]
  },
  {
    column_id: 'hardiness_temp',
    column_name: 'hardiness_temp',
    table_name: 'parcels_agriculture',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'hardiness_temp',
    header_label: 'hardiness_temp',
    column_groups: [
      column_categories.AGRICULTURE,
      column_categories.PLANT_HARDINESS
    ]
  },
  {
    column_id: 'airport_distance_km',
    column_name: 'distance_km',
    table_name: 'parcels_airport',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'distance_km',
    header_label: 'airport_distance_km',
    column_title: 'Airport Distance (km)',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DISTANCE_TO_FEATURES,
      column_categories.AIRPORT
    ]
  },
  {
    column_id: 'geological_features_updated',
    column_name: 'geological_features_updated',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'geological_features_updated',
    header_label: 'geological_features_updated',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.GEOLOGIC_FEATURES
    ]
  },
  {
    column_id: 'closest_geological_features_items',
    column_name: 'closest_geological_features_items',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.JSON,
    accessorKey: 'closest_geological_features_items',
    header_label: 'closest_geological_features_items',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.GEOLOGIC_FEATURES
    ]
  },
  {
    column_id: 'geological_features_1km',
    column_name: 'geological_features_1km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.JSON,
    accessorKey: 'geological_features_1km',
    header_label: 'geological_features_1km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.GEOLOGIC_FEATURES
    ]
  },
  {
    column_id: 'geological_features_count_1km',
    column_name: 'geological_features_count_1km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'geological_features_count_1km',
    header_label: 'geological_features_count_1km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.GEOLOGIC_FEATURES
    ]
  },
  {
    column_id: 'geological_features_5km',
    column_name: 'geological_features_5km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.JSON,
    accessorKey: 'geological_features_5km',
    header_label: 'geological_features_5km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.GEOLOGIC_FEATURES
    ]
  },
  {
    column_id: 'geological_features_count_5km',
    column_name: 'geological_features_count_5km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'geological_features_count_5km',
    header_label: 'geological_features_count_5km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.GEOLOGIC_FEATURES
    ]
  },
  {
    column_id: 'geological_features_10km',
    column_name: 'geological_features_10km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.JSON,
    accessorKey: 'geological_features_10km',
    header_label: 'geological_features_10km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.GEOLOGIC_FEATURES
    ]
  },
  {
    column_id: 'geological_features_count_10km',
    column_name: 'geological_features_count_10km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'geological_features_count_10km',
    header_label: 'geological_features_count_10km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.GEOLOGIC_FEATURES
    ]
  },
  {
    column_id: 'geological_features_25km',
    column_name: 'geological_features_25km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.JSON,
    accessorKey: 'geological_features_25km',
    header_label: 'geological_features_25km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.GEOLOGIC_FEATURES
    ]
  },
  {
    column_id: 'geological_features_count_25km',
    column_name: 'geological_features_count_25km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'geological_features_count_25km',
    header_label: 'geological_features_count_25km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.GEOLOGIC_FEATURES
    ]
  },
  {
    column_id: 'healthcare_updated',
    column_name: 'healthcare_updated',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'healthcare_updated',
    header_label: 'healthcare_updated',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.HEALTHCARE
    ]
  },
  {
    column_id: 'closest_healthcare_items',
    column_name: 'closest_healthcare_items',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.JSON,
    accessorKey: 'closest_healthcare_items',
    header_label: 'closest_healthcare_items',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.HEALTHCARE
    ]
  },
  {
    column_id: 'healthcare_1km',
    column_name: 'healthcare_1km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.JSON,
    accessorKey: 'healthcare_1km',
    header_label: 'healthcare_1km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.HEALTHCARE
    ]
  },
  {
    column_id: 'healthcare_count_1km',
    column_name: 'healthcare_count_1km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'healthcare_count_1km',
    header_label: 'healthcare_count_1km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.HEALTHCARE
    ]
  },
  {
    column_id: 'healthcare_5km',
    column_name: 'healthcare_5km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.JSON,
    accessorKey: 'healthcare_5km',
    header_label: 'healthcare_5km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.HEALTHCARE
    ]
  },
  {
    column_id: 'healthcare_count_5km',
    column_name: 'healthcare_count_5km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'healthcare_count_5km',
    header_label: 'healthcare_count_5km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.HEALTHCARE
    ]
  },
  {
    column_id: 'healthcare_10km',
    column_name: 'healthcare_10km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.JSON,
    accessorKey: 'healthcare_10km',
    header_label: 'healthcare_10km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.HEALTHCARE
    ]
  },
  {
    column_id: 'healthcare_count_10km',
    column_name: 'healthcare_count_10km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'healthcare_count_10km',
    header_label: 'healthcare_count_10km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.HEALTHCARE
    ]
  },
  {
    column_id: 'healthcare_25km',
    column_name: 'healthcare_25km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.JSON,
    accessorKey: 'healthcare_25km',
    header_label: 'healthcare_25km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.HEALTHCARE
    ]
  },
  {
    column_id: 'healthcare_count_25km',
    column_name: 'healthcare_count_25km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'healthcare_count_25km',
    header_label: 'healthcare_count_25km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.HEALTHCARE
    ]
  },
  {
    column_id: 'healthcare_50km',
    column_name: 'healthcare_50km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.JSON,
    accessorKey: 'healthcare_50km',
    header_label: 'healthcare_50km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.HEALTHCARE
    ]
  },
  {
    column_id: 'healthcare_count_50km',
    column_name: 'healthcare_count_50km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'healthcare_count_50km',
    header_label: 'healthcare_count_50km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.HEALTHCARE
    ]
  },
  {
    column_id: 'healthcare_100km',
    column_name: 'healthcare_100km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.JSON,
    accessorKey: 'healthcare_100km',
    header_label: 'healthcare_100km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.HEALTHCARE
    ]
  },
  {
    column_id: 'healthcare_count_100km',
    column_name: 'healthcare_count_100km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'healthcare_count_100km',
    header_label: 'healthcare_count_100km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.HEALTHCARE
    ]
  },
  {
    column_id: 'healthcare_150km',
    column_name: 'healthcare_150km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.JSON,
    accessorKey: 'healthcare_150km',
    header_label: 'healthcare_150km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.HEALTHCARE
    ]
  },
  {
    column_id: 'healthcare_count_150km',
    column_name: 'healthcare_count_150km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'healthcare_count_150km',
    header_label: 'healthcare_count_150km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.HEALTHCARE
    ]
  },
  {
    column_id: 'healthcare_200km',
    column_name: 'healthcare_200km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.JSON,
    accessorKey: 'healthcare_200km',
    header_label: 'healthcare_200km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.HEALTHCARE
    ]
  },
  {
    column_id: 'healthcare_count_200km',
    column_name: 'healthcare_count_200km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'healthcare_count_200km',
    header_label: 'healthcare_count_200km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.HEALTHCARE
    ]
  },
  {
    column_id: 'library_updated',
    column_name: 'library_updated',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'library_updated',
    header_label: 'library_updated',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.LIBRARY
    ]
  },
  {
    column_id: 'closest_library_items',
    column_name: 'closest_library_items',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.JSON,
    accessorKey: 'closest_library_items',
    header_label: 'closest_library_items',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.LIBRARY
    ]
  },
  {
    column_id: 'library_1km',
    column_name: 'library_1km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.JSON,
    accessorKey: 'library_1km',
    header_label: 'library_1km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.LIBRARY
    ]
  },
  {
    column_id: 'library_count_1km',
    column_name: 'library_count_1km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'library_count_1km',
    header_label: 'library_count_1km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.LIBRARY
    ]
  },
  {
    column_id: 'library_5km',
    column_name: 'library_5km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.JSON,
    accessorKey: 'library_5km',
    header_label: 'library_5km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.LIBRARY
    ]
  },
  {
    column_id: 'library_count_5km',
    column_name: 'library_count_5km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'library_count_5km',
    header_label: 'library_count_5km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.LIBRARY
    ]
  },
  {
    column_id: 'library_10km',
    column_name: 'library_10km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.JSON,
    accessorKey: 'library_10km',
    header_label: 'library_10km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.LIBRARY
    ]
  },
  {
    column_id: 'library_count_10km',
    column_name: 'library_count_10km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'library_count_10km',
    header_label: 'library_count_10km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.LIBRARY
    ]
  },
  {
    column_id: 'library_25km',
    column_name: 'library_25km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.JSON,
    accessorKey: 'library_25km',
    header_label: 'library_25km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.LIBRARY
    ]
  },
  {
    column_id: 'library_count_25km',
    column_name: 'library_count_25km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'library_count_25km',
    header_label: 'library_count_25km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.LIBRARY
    ]
  },
  {
    column_id: 'library_50km',
    column_name: 'library_50km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.JSON,
    accessorKey: 'library_50km',
    header_label: 'library_50km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.LIBRARY
    ]
  },
  {
    column_id: 'library_count_50km',
    column_name: 'library_count_50km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'library_count_50km',
    header_label: 'library_count_50km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.LIBRARY
    ]
  },
  {
    column_id: 'military_updated',
    column_name: 'military_updated',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'military_updated',
    header_label: 'military_updated',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.MILITARY
    ]
  },
  {
    column_id: 'closest_military_distance',
    column_name: 'closest_military_distance',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'closest_military_distance',
    header_label: 'closest_military_distance',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.MILITARY
    ]
  },
  {
    column_id: 'closest_military_items',
    column_name: 'closest_military_items',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.JSON,
    accessorKey: 'closest_military_items',
    header_label: 'closest_military_items',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.MILITARY
    ]
  },
  {
    column_id: 'military_1km',
    column_name: 'military_1km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.JSON,
    accessorKey: 'military_1km',
    header_label: 'military_1km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.MILITARY
    ]
  },
  {
    column_id: 'military_count_1km',
    column_name: 'military_count_1km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'military_count_1km',
    header_label: 'military_count_1km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.MILITARY
    ]
  },
  {
    column_id: 'military_5km',
    column_name: 'military_5km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.JSON,
    accessorKey: 'military_5km',
    header_label: 'military_5km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.MILITARY
    ]
  },
  {
    column_id: 'military_count_5km',
    column_name: 'military_count_5km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'military_count_5km',
    header_label: 'military_count_5km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.MILITARY
    ]
  },
  {
    column_id: 'military_10km',
    column_name: 'military_10km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.JSON,
    accessorKey: 'military_10km',
    header_label: 'military_10km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.MILITARY
    ]
  },
  {
    column_id: 'military_count_10km',
    column_name: 'military_count_10km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'military_count_10km',
    header_label: 'military_count_10km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.MILITARY
    ]
  },
  {
    column_id: 'military_25km',
    column_name: 'military_25km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.JSON,
    accessorKey: 'military_25km',
    header_label: 'military_25km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.MILITARY
    ]
  },
  {
    column_id: 'military_count_25km',
    column_name: 'military_count_25km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'military_count_25km',
    header_label: 'military_count_25km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.MILITARY
    ]
  },
  {
    column_id: 'military_50km',
    column_name: 'military_50km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.JSON,
    accessorKey: 'military_50km',
    header_label: 'military_50km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.MILITARY
    ]
  },
  {
    column_id: 'military_count_50km',
    column_name: 'military_count_50km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'military_count_50km',
    header_label: 'military_count_50km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.MILITARY
    ]
  },
  {
    column_id: 'military_100km',
    column_name: 'military_100km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.JSON,
    accessorKey: 'military_100km',
    header_label: 'military_100km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.MILITARY
    ]
  },
  {
    column_id: 'military_count_100km',
    column_name: 'military_count_100km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'military_count_100km',
    header_label: 'military_count_100km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.MILITARY
    ]
  },
  {
    column_id: 'military_150km',
    column_name: 'military_150km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.JSON,
    accessorKey: 'military_150km',
    header_label: 'military_150km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.MILITARY
    ]
  },
  {
    column_id: 'military_count_150km',
    column_name: 'military_count_150km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'military_count_150km',
    header_label: 'military_count_150km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.MILITARY
    ]
  },
  {
    column_id: 'military_200km',
    column_name: 'military_200km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.JSON,
    accessorKey: 'military_200km',
    header_label: 'military_200km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.MILITARY
    ]
  },
  {
    column_id: 'military_count_200km',
    column_name: 'military_count_200km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'military_count_200km',
    header_label: 'military_count_200km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.MILITARY
    ]
  },
  {
    column_id: 'natural_updated',
    column_name: 'natural_updated',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'natural_updated',
    header_label: 'natural_updated',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.NATURAL
    ]
  },
  {
    column_id: 'closest_natural_items',
    column_name: 'closest_natural_items',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.JSON,
    accessorKey: 'closest_natural_items',
    header_label: 'closest_natural_items',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.NATURAL
    ]
  },
  {
    column_id: 'natural_1km',
    column_name: 'natural_1km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.JSON,
    accessorKey: 'natural_1km',
    header_label: 'natural_1km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.NATURAL
    ]
  },
  {
    column_id: 'natural_count_1km',
    column_name: 'natural_count_1km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'natural_count_1km',
    header_label: 'natural_count_1km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.NATURAL
    ]
  },
  {
    column_id: 'natural_density_1km',
    column_name: 'natural_density_1km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'natural_density_1km',
    header_label: 'natural_density_1km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.NATURAL
    ]
  },
  {
    column_id: 'natural_5km',
    column_name: 'natural_5km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.JSON,
    accessorKey: 'natural_5km',
    header_label: 'natural_5km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.NATURAL
    ]
  },
  {
    column_id: 'natural_count_5km',
    column_name: 'natural_count_5km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'natural_count_5km',
    header_label: 'natural_count_5km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.NATURAL
    ]
  },
  {
    column_id: 'natural_density_5km',
    column_name: 'natural_density_5km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'natural_density_5km',
    header_label: 'natural_density_5km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.NATURAL
    ]
  },
  {
    column_id: 'natural_10km',
    column_name: 'natural_10km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.JSON,
    accessorKey: 'natural_10km',
    header_label: 'natural_10km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.NATURAL
    ]
  },
  {
    column_id: 'natural_count_10km',
    column_name: 'natural_count_10km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'natural_count_10km',
    header_label: 'natural_count_10km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.NATURAL
    ]
  },
  {
    column_id: 'natural_density_10km',
    column_name: 'natural_density_10km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'natural_density_10km',
    header_label: 'natural_density_10km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.NATURAL
    ]
  },
  {
    column_id: 'natural_25km',
    column_name: 'natural_25km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.JSON,
    accessorKey: 'natural_25km',
    header_label: 'natural_25km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.NATURAL
    ]
  },
  {
    column_id: 'natural_count_25km',
    column_name: 'natural_count_25km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'natural_count_25km',
    header_label: 'natural_count_25km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.NATURAL
    ]
  },
  {
    column_id: 'natural_density_25km',
    column_name: 'natural_density_25km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'natural_density_25km',
    header_label: 'natural_density_25km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.NATURAL
    ]
  },
  {
    column_id: 'pollution_updated',
    column_name: 'pollution_updated',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'pollution_updated',
    header_label: 'pollution_updated',
    column_groups: [column_categories.POLLUTION, column_categories.DENSITY]
  },
  {
    column_id: 'closest_pollution_items',
    column_name: 'closest_pollution_items',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.JSON,
    accessorKey: 'closest_pollution_items',
    header_label: 'closest_pollution_items',
    column_groups: [column_categories.POLLUTION, column_categories.DENSITY]
  },
  {
    column_id: 'pollution_1km',
    column_name: 'pollution_1km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.JSON,
    accessorKey: 'pollution_1km',
    header_label: 'pollution_1km',
    column_groups: [column_categories.POLLUTION, column_categories.DENSITY]
  },
  {
    column_id: 'pollution_count_1km',
    column_name: 'pollution_count_1km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'pollution_count_1km',
    header_label: 'pollution_count_1km',
    column_groups: [column_categories.POLLUTION, column_categories.DENSITY]
  },
  {
    column_id: 'pollution_density_1km',
    column_name: 'pollution_density_1km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'pollution_density_1km',
    header_label: 'pollution_density_1km',
    column_groups: [column_categories.POLLUTION, column_categories.DENSITY]
  },
  {
    column_id: 'pollution_5km',
    column_name: 'pollution_5km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.JSON,
    accessorKey: 'pollution_5km',
    header_label: 'pollution_5km',
    column_groups: [column_categories.POLLUTION, column_categories.DENSITY]
  },
  {
    column_id: 'pollution_count_5km',
    column_name: 'pollution_count_5km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'pollution_count_5km',
    header_label: 'pollution_count_5km',
    column_groups: [column_categories.POLLUTION, column_categories.DENSITY]
  },
  {
    column_id: 'pollution_density_5km',
    column_name: 'pollution_density_5km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'pollution_density_5km',
    header_label: 'pollution_density_5km',
    column_groups: [column_categories.POLLUTION, column_categories.DENSITY]
  },
  {
    column_id: 'pollution_10km',
    column_name: 'pollution_10km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.JSON,
    accessorKey: 'pollution_10km',
    header_label: 'pollution_10km',
    column_groups: [column_categories.POLLUTION, column_categories.DENSITY]
  },
  {
    column_id: 'pollution_count_10km',
    column_name: 'pollution_count_10km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'pollution_count_10km',
    header_label: 'pollution_count_10km',
    column_groups: [column_categories.POLLUTION, column_categories.DENSITY]
  },
  {
    column_id: 'pollution_density_10km',
    column_name: 'pollution_density_10km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'pollution_density_10km',
    header_label: 'pollution_density_10km',
    column_groups: [column_categories.POLLUTION, column_categories.DENSITY]
  },
  {
    column_id: 'pollution_25km',
    column_name: 'pollution_25km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.JSON,
    accessorKey: 'pollution_25km',
    header_label: 'pollution_25km',
    column_groups: [column_categories.POLLUTION, column_categories.DENSITY]
  },
  {
    column_id: 'pollution_count_25km',
    column_name: 'pollution_count_25km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'pollution_count_25km',
    header_label: 'pollution_count_25km',
    column_groups: [column_categories.POLLUTION, column_categories.DENSITY]
  },
  {
    column_id: 'pollution_density_25km',
    column_name: 'pollution_density_25km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'pollution_density_25km',
    header_label: 'pollution_density_25km',
    column_groups: [column_categories.POLLUTION, column_categories.DENSITY]
  },
  {
    column_id: 'public_land_updated',
    column_name: 'public_land_updated',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'public_land_updated',
    header_label: 'public_land_updated',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.PUBLIC_LAND
    ]
  },
  {
    column_id: 'closest_public_land_items',
    column_name: 'closest_public_land_items',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.JSON,
    accessorKey: 'closest_public_land_items',
    header_label: 'closest_public_land_items',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.PUBLIC_LAND
    ]
  },
  {
    column_id: 'public_land_1km',
    column_name: 'public_land_1km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.JSON,
    accessorKey: 'public_land_1km',
    header_label: 'public_land_1km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.PUBLIC_LAND
    ]
  },
  {
    column_id: 'public_land_count_1km',
    column_name: 'public_land_count_1km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'public_land_count_1km',
    header_label: 'public_land_count_1km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.PUBLIC_LAND
    ]
  },
  {
    column_id: 'public_land_density_1km',
    column_name: 'public_land_density_1km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'public_land_density_1km',
    header_label: 'public_land_density_1km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.PUBLIC_LAND
    ]
  },
  {
    column_id: 'public_land_5km',
    column_name: 'public_land_5km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.JSON,
    accessorKey: 'public_land_5km',
    header_label: 'public_land_5km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.PUBLIC_LAND
    ]
  },
  {
    column_id: 'public_land_count_5km',
    column_name: 'public_land_count_5km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'public_land_count_5km',
    header_label: 'public_land_count_5km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.PUBLIC_LAND
    ]
  },
  {
    column_id: 'public_land_density_5km',
    column_name: 'public_land_density_5km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'public_land_density_5km',
    header_label: 'public_land_density_5km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.PUBLIC_LAND
    ]
  },
  {
    column_id: 'public_land_10km',
    column_name: 'public_land_10km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.JSON,
    accessorKey: 'public_land_10km',
    header_label: 'public_land_10km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.PUBLIC_LAND
    ]
  },
  {
    column_id: 'public_land_count_10km',
    column_name: 'public_land_count_10km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'public_land_count_10km',
    header_label: 'public_land_count_10km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.PUBLIC_LAND
    ]
  },
  {
    column_id: 'public_land_density_10km',
    column_name: 'public_land_density_10km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'public_land_density_10km',
    header_label: 'public_land_density_10km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.PUBLIC_LAND
    ]
  },
  {
    column_id: 'public_land_25km',
    column_name: 'public_land_25km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.JSON,
    accessorKey: 'public_land_25km',
    header_label: 'public_land_25km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.PUBLIC_LAND
    ]
  },
  {
    column_id: 'public_land_count_25km',
    column_name: 'public_land_count_25km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'public_land_count_25km',
    header_label: 'public_land_count_25km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.PUBLIC_LAND
    ]
  },
  {
    column_id: 'public_land_density_25km',
    column_name: 'public_land_density_25km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'public_land_density_25km',
    header_label: 'public_land_density_25km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.PUBLIC_LAND
    ]
  },
  {
    column_id: 'religious_updated',
    column_name: 'religious_updated',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'religious_updated',
    header_label: 'religious_updated',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.RELIGIOUS
    ]
  },
  {
    column_id: 'closest_religious_items',
    column_name: 'closest_religious_items',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.JSON,
    accessorKey: 'closest_religious_items',
    header_label: 'closest_religious_items',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.RELIGIOUS
    ]
  },
  {
    column_id: 'religion_1km',
    column_name: 'religion_1km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.JSON,
    accessorKey: 'religion_1km',
    header_label: 'religion_1km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.RELIGIOUS
    ]
  },
  {
    column_id: 'religion_count_1km',
    column_name: 'religion_count_1km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'religion_count_1km',
    header_label: 'religion_count_1km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.RELIGIOUS
    ]
  },
  {
    column_id: 'religion_density_1km',
    column_name: 'religion_density_1km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'religion_density_1km',
    header_label: 'religion_density_1km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.RELIGIOUS
    ]
  },
  {
    column_id: 'religion_5km',
    column_name: 'religion_5km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.JSON,
    accessorKey: 'religion_5km',
    header_label: 'religion_5km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.RELIGIOUS
    ]
  },
  {
    column_id: 'religion_count_5km',
    column_name: 'religion_count_5km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'religion_count_5km',
    header_label: 'religion_count_5km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.RELIGIOUS
    ]
  },
  {
    column_id: 'religion_density_5km',
    column_name: 'religion_density_5km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'religion_density_5km',
    header_label: 'religion_density_5km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.RELIGIOUS
    ]
  },
  {
    column_id: 'religion_10km',
    column_name: 'religion_10km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.JSON,
    accessorKey: 'religion_10km',
    header_label: 'religion_10km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.RELIGIOUS
    ]
  },
  {
    column_id: 'religion_count_10km',
    column_name: 'religion_count_10km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'religion_count_10km',
    header_label: 'religion_count_10km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.RELIGIOUS
    ]
  },
  {
    column_id: 'religion_density_10km',
    column_name: 'religion_density_10km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'religion_density_10km',
    header_label: 'religion_density_10km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.RELIGIOUS
    ]
  },
  {
    column_id: 'religion_25km',
    column_name: 'religion_25km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.JSON,
    accessorKey: 'religion_25km',
    header_label: 'religion_25km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.RELIGIOUS
    ]
  },
  {
    column_id: 'religion_count_25km',
    column_name: 'religion_count_25km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'religion_count_25km',
    header_label: 'religion_count_25km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.RELIGIOUS
    ]
  },
  {
    column_id: 'religion_density_25km',
    column_name: 'religion_density_25km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'religion_density_25km',
    header_label: 'religion_density_25km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.RELIGIOUS
    ]
  },
  {
    column_id: 'religion_50km',
    column_name: 'religion_50km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.JSON,
    accessorKey: 'religion_50km',
    header_label: 'religion_50km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.RELIGIOUS
    ]
  },
  {
    column_id: 'religion_count_50km',
    column_name: 'religion_count_50km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'religion_count_50km',
    header_label: 'religion_count_50km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.RELIGIOUS
    ]
  },
  {
    column_id: 'religion_density_50km',
    column_name: 'religion_density_50km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'religion_density_50km',
    header_label: 'religion_density_50km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.RELIGIOUS
    ]
  },
  {
    column_id: 'religion_100km',
    column_name: 'religion_100km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.JSON,
    accessorKey: 'religion_100km',
    header_label: 'religion_100km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.RELIGIOUS
    ]
  },
  {
    column_id: 'religion_count_100km',
    column_name: 'religion_count_100km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'religion_count_100km',
    header_label: 'religion_count_100km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.RELIGIOUS
    ]
  },
  {
    column_id: 'religion_density_100km',
    column_name: 'religion_density_100km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'religion_density_100km',
    header_label: 'religion_density_100km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.RELIGIOUS
    ]
  },
  {
    column_id: 'religion_150km',
    column_name: 'religion_150km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.JSON,
    accessorKey: 'religion_150km',
    header_label: 'religion_150km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.RELIGIOUS
    ]
  },
  {
    column_id: 'religion_count_150km',
    column_name: 'religion_count_150km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'religion_count_150km',
    header_label: 'religion_count_150km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.RELIGIOUS
    ]
  },
  {
    column_id: 'religion_density_150km',
    column_name: 'religion_density_150km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'religion_density_150km',
    header_label: 'religion_density_150km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.RELIGIOUS
    ]
  },
  {
    column_id: 'spring_updated',
    column_name: 'spring_updated',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'spring_updated',
    header_label: 'spring_updated',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.SPRING
    ]
  },
  {
    column_id: 'closest_spring_distance',
    column_name: 'closest_spring_distance',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'closest_spring_distance',
    header_label: 'closest_spring_distance',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.SPRING
    ]
  },
  {
    column_id: 'closest_spring_items',
    column_name: 'closest_spring_items',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.JSON,
    accessorKey: 'closest_spring_items',
    header_label: 'closest_spring_items',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.SPRING
    ]
  },
  {
    column_id: 'spring_1km',
    column_name: 'spring_1km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.JSON,
    accessorKey: 'spring_1km',
    header_label: 'spring_1km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.SPRING
    ]
  },
  {
    column_id: 'spring_count_1km',
    column_name: 'spring_count_1km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'spring_count_1km',
    header_label: 'spring_count_1km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.SPRING
    ]
  },
  {
    column_id: 'spring_5km',
    column_name: 'spring_5km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.JSON,
    accessorKey: 'spring_5km',
    header_label: 'spring_5km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.SPRING
    ]
  },
  {
    column_id: 'spring_count_5km',
    column_name: 'spring_count_5km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'spring_count_5km',
    header_label: 'spring_count_5km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.SPRING
    ]
  },
  {
    column_id: 'spring_10km',
    column_name: 'spring_10km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.JSON,
    accessorKey: 'spring_10km',
    header_label: 'spring_10km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.SPRING
    ]
  },
  {
    column_id: 'spring_count_10km',
    column_name: 'spring_count_10km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'spring_count_10km',
    header_label: 'spring_count_10km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.SPRING
    ]
  },
  {
    column_id: 'spring_25km',
    column_name: 'spring_25km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.JSON,
    accessorKey: 'spring_25km',
    header_label: 'spring_25km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.SPRING
    ]
  },
  {
    column_id: 'spring_count_25km',
    column_name: 'spring_count_25km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'spring_count_25km',
    header_label: 'spring_count_25km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.SPRING
    ]
  },
  {
    column_id: 'spring_50km',
    column_name: 'spring_50km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.JSON,
    accessorKey: 'spring_50km',
    header_label: 'spring_50km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.SPRING
    ]
  },
  {
    column_id: 'spring_count_50km',
    column_name: 'spring_count_50km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'spring_count_50km',
    header_label: 'spring_count_50km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.SPRING
    ]
  },
  {
    column_id: 'spring_100km',
    column_name: 'spring_100km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.JSON,
    accessorKey: 'spring_100km',
    header_label: 'spring_100km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.SPRING
    ]
  },
  {
    column_id: 'spring_count_100km',
    column_name: 'spring_count_100km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'spring_count_100km',
    header_label: 'spring_count_100km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.SPRING
    ]
  },
  {
    column_id: 'water_updated',
    column_name: 'water_updated',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'water_updated',
    header_label: 'water_updated',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.WATER
    ]
  },
  {
    column_id: 'closest_water_items',
    column_name: 'closest_water_items',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.JSON,
    accessorKey: 'closest_water_items',
    header_label: 'closest_water_items',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.WATER
    ]
  },
  {
    column_id: 'water_1km',
    column_name: 'water_1km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.JSON,
    accessorKey: 'water_1km',
    header_label: 'water_1km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.WATER
    ]
  },
  {
    column_id: 'water_count_1km',
    column_name: 'water_count_1km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'water_count_1km',
    header_label: 'water_count_1km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.WATER
    ]
  },
  {
    column_id: 'water_density_1km',
    column_name: 'water_density_1km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'water_density_1km',
    header_label: 'water_density_1km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.WATER
    ]
  },
  {
    column_id: 'water_5km',
    column_name: 'water_5km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.JSON,
    accessorKey: 'water_5km',
    header_label: 'water_5km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.WATER
    ]
  },
  {
    column_id: 'water_count_5km',
    column_name: 'water_count_5km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'water_count_5km',
    header_label: 'water_count_5km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.WATER
    ]
  },
  {
    column_id: 'water_density_5km',
    column_name: 'water_density_5km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'water_density_5km',
    header_label: 'water_density_5km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.WATER
    ]
  },
  {
    column_id: 'water_10km',
    column_name: 'water_10km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.JSON,
    accessorKey: 'water_10km',
    header_label: 'water_10km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.WATER
    ]
  },
  {
    column_id: 'water_count_10km',
    column_name: 'water_count_10km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'water_count_10km',
    header_label: 'water_count_10km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.WATER
    ]
  },
  {
    column_id: 'water_density_10km',
    column_name: 'water_density_10km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'water_density_10km',
    header_label: 'water_density_10km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.WATER
    ]
  },
  {
    column_id: 'water_25km',
    column_name: 'water_25km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.JSON,
    accessorKey: 'water_25km',
    header_label: 'water_25km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.WATER
    ]
  },
  {
    column_id: 'water_count_25km',
    column_name: 'water_count_25km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'water_count_25km',
    header_label: 'water_count_25km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.WATER
    ]
  },
  {
    column_id: 'water_density_25km',
    column_name: 'water_density_25km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'water_density_25km',
    header_label: 'water_density_25km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.WATER
    ]
  },
  {
    column_id: 'water_50km',
    column_name: 'water_50km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.JSON,
    accessorKey: 'water_50km',
    header_label: 'water_50km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.WATER
    ]
  },
  {
    column_id: 'water_count_50km',
    column_name: 'water_count_50km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'water_count_50km',
    header_label: 'water_count_50km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.WATER
    ]
  },
  {
    column_id: 'water_density_50km',
    column_name: 'water_density_50km',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'water_density_50km',
    header_label: 'water_density_50km',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.WATER
    ]
  },
  {
    column_id: 'min',
    column_name: 'min',
    table_name: 'parcels_elevation',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'min',
    header_label: 'min',
    column_groups: [column_categories.ELEVATION]
  },
  {
    column_id: 'p10',
    column_name: 'p10',
    table_name: 'parcels_elevation',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'p10',
    header_label: 'p10',
    column_groups: [column_categories.ELEVATION]
  },
  {
    column_id: 'p25',
    column_name: 'p25',
    table_name: 'parcels_elevation',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'p25',
    header_label: 'p25',
    column_groups: [column_categories.ELEVATION]
  },
  {
    column_id: 'p50',
    column_name: 'p50',
    table_name: 'parcels_elevation',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'p50',
    header_label: 'p50',
    column_groups: [column_categories.ELEVATION]
  },
  {
    column_id: 'p75',
    column_name: 'p75',
    table_name: 'parcels_elevation',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'p75',
    header_label: 'p75',
    column_groups: [column_categories.ELEVATION]
  },
  {
    column_id: 'p90',
    column_name: 'p90',
    table_name: 'parcels_elevation',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'p90',
    header_label: 'p90',
    column_groups: [column_categories.ELEVATION]
  },
  {
    column_id: 'max',
    column_name: 'max',
    table_name: 'parcels_elevation',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'max',
    header_label: 'max',
    column_groups: [column_categories.ELEVATION]
  },
  {
    column_id: 'median',
    column_name: 'median',
    table_name: 'parcels_elevation',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'median',
    header_label: 'median',
    column_groups: [column_categories.ELEVATION]
  },
  {
    column_id: 'coordinates',
    column_name: 'coordinates',
    table_name: 'parcels_geometry',
    data_type: table_constants.TABLE_DATA_TYPES.JSON,
    accessorKey: 'coordinates',
    header_label: 'coordinates',
    column_groups: [column_categories.LOCATION, column_categories.COORDINATES]
  },
  {
    column_id: 'broadband_updated',
    column_name: 'broadband_updated',
    table_name: 'parcels_internet',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'broadband_updated',
    header_label: 'broadband_updated',
    column_groups: [column_categories.INTERNET]
  },
  {
    column_id: 'max_download_speed',
    column_name: 'max_download_speed',
    table_name: 'parcels_internet',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'max_download_speed',
    header_label: 'max_download_speed',
    column_groups: [
      column_categories.INTERNET,
      column_categories.INTERNET_SPEED,
      column_categories.INTERNET_DOWNLOAD
    ]
  },
  {
    column_id: 'max_upload_speed',
    column_name: 'max_upload_speed',
    table_name: 'parcels_internet',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'max_upload_speed',
    header_label: 'max_upload_speed',
    column_groups: [
      column_categories.INTERNET,
      column_categories.INTERNET_SPEED,
      column_categories.INTERNET_UPLOAD
    ]
  },
  {
    column_id: 'low_latency',
    column_name: 'low_latency',
    table_name: 'parcels_internet',
    data_type: table_constants.TABLE_DATA_TYPES.BOOLEAN,
    accessorKey: 'low_latency',
    header_label: 'low_latency',
    column_groups: [
      column_categories.INTERNET,
      column_categories.INTERNET_LATENCY
    ]
  },
  {
    column_id: 'closest_provider_distance',
    column_name: 'closest_provider_distance',
    table_name: 'parcels_internet',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'closest_provider_distance',
    header_label: 'closest_provider_distance',
    column_groups: [
      column_categories.INTERNET
      // TODO distance to
    ]
  },
  {
    column_id: 'nearby_max_download_speed',
    column_name: 'nearby_max_download_speed',
    table_name: 'parcels_internet',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'nearby_max_download_speed',
    header_label: 'nearby_max_download_speed',
    column_groups: [
      column_categories.INTERNET,
      column_categories.INTERNET_SPEED,
      column_categories.INTERNET_DOWNLOAD
    ]
  },
  {
    column_id: 'nearby_max_upload_speed',
    column_name: 'nearby_max_upload_speed',
    table_name: 'parcels_internet',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'nearby_max_upload_speed',
    header_label: 'nearby_max_upload_speed',
    column_groups: [
      column_categories.INTERNET,
      column_categories.INTERNET_SPEED,
      column_categories.INTERNET_UPLOAD
    ]
  },
  {
    column_id: 'surrounding_providers',
    column_name: 'surrounding_providers',
    table_name: 'parcels_internet',
    data_type: table_constants.TABLE_DATA_TYPES.JSON,
    accessorKey: 'surrounding_providers',
    header_label: 'surrounding_providers',
    column_groups: [
      column_categories.INTERNET,
      column_categories.INTERNET_PROVIDER
    ]
  },
  {
    column_id: 'surrounding_coverage_density',
    column_name: 'surrounding_coverage_density',
    table_name: 'parcels_internet',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'surrounding_coverage_density',
    header_label: 'surrounding_coverage_density',
    column_groups: [
      column_categories.INTERNET,
      column_categories.INTERNET_COVERAGE
    ]
  },
  {
    column_id: 'public',
    column_name: 'public',
    table_name: 'parcels_meta',
    data_type: table_constants.TABLE_DATA_TYPES.BOOLEAN,
    accessorKey: 'public',
    header_label: 'public',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'tribal',
    column_name: 'tribal',
    table_name: 'parcels_meta',
    data_type: table_constants.TABLE_DATA_TYPES.BOOLEAN,
    accessorKey: 'tribal',
    header_label: 'tribal',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'nature_updated',
    column_name: 'nature_updated',
    table_name: 'parcels_nature',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'nature_updated',
    header_label: 'nature_updated',
    column_groups: [column_categories.NATURE]
  },
  {
    column_id: 'nature_score',
    column_name: 'nature_score',
    table_name: 'parcels_nature',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'nature_score',
    header_label: 'nature_score',
    column_groups: [column_categories.NATURE]
  },
  {
    column_id: 'leaf_rating',
    column_name: 'leaf_rating',
    table_name: 'parcels_nature',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'leaf_rating',
    header_label: 'leaf_rating',
    column_groups: [column_categories.NATURE]
  },
  {
    column_id: 'hardiness_temp_rank',
    column_name: 'hardiness_temp_rank',
    table_name: 'parcels_rank',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'hardiness_temp_rank',
    header_label: 'hardiness_temp_rank',
    column_groups: [
      column_categories.AGRICULTURE,
      column_categories.PLANT_HARDINESS
    ]
  },
  {
    column_id: 'max_download_speed_rank',
    column_name: 'max_download_speed_rank',
    table_name: 'parcels_rank',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'max_download_speed_rank',
    header_label: 'max_download_speed_rank',
    column_groups: [
      column_categories.INTERNET,
      column_categories.INTERNET_SPEED,
      column_categories.INTERNET_DOWNLOAD
    ]
  },
  {
    column_id: 'closest_military_distance_rank',
    column_name: 'closest_military_distance_rank',
    table_name: 'parcels_rank',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'closest_military_distance_rank',
    header_label: 'closest_military_distance_rank',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DISTANCE_TO_FEATURES,
      column_categories.MILITARY
    ]
  },
  {
    column_id: 'closest_spring_distance_rank',
    column_name: 'closest_spring_distance_rank',
    table_name: 'parcels_rank',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'closest_spring_distance_rank',
    header_label: 'closest_spring_distance_rank',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DISTANCE_TO_FEATURES,
      column_categories.SPRING
    ]
  },
  {
    column_id: 'military_count_25km_rank',
    column_name: 'military_count_25km_rank',
    table_name: 'parcels_rank',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'military_count_25km_rank',
    header_label: 'military_count_25km_rank',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.MILITARY
    ]
  },
  {
    column_id: 'military_count_50km_rank',
    column_name: 'military_count_50km_rank',
    table_name: 'parcels_rank',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'military_count_50km_rank',
    header_label: 'military_count_50km_rank',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.MILITARY
    ]
  },
  {
    column_id: 'military_count_200km_rank',
    column_name: 'military_count_200km_rank',
    table_name: 'parcels_rank',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'military_count_200km_rank',
    header_label: 'military_count_200km_rank',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.MILITARY
    ]
  },
  {
    column_id: 'spring_count_1km_rank',
    column_name: 'spring_count_1km_rank',
    table_name: 'parcels_rank',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'spring_count_1km_rank',
    header_label: 'spring_count_1km_rank',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.SPRING
    ]
  },
  {
    column_id: 'spring_count_5km_rank',
    column_name: 'spring_count_5km_rank',
    table_name: 'parcels_rank',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'spring_count_5km_rank',
    header_label: 'spring_count_5km_rank',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.SPRING
    ]
  },
  {
    column_id: 'spring_count_10km_rank',
    column_name: 'spring_count_10km_rank',
    table_name: 'parcels_rank',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'spring_count_10km_rank',
    header_label: 'spring_count_10km_rank',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.SPRING
    ]
  },
  {
    column_id: 'spring_count_50km_rank',
    column_name: 'spring_count_50km_rank',
    table_name: 'parcels_rank',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'spring_count_50km_rank',
    header_label: 'spring_count_50km_rank',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.SPRING
    ]
  },
  {
    column_id: 'spring_count_100km_rank',
    column_name: 'spring_count_100km_rank',
    table_name: 'parcels_rank',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'spring_count_100km_rank',
    header_label: 'spring_count_100km_rank',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DENSITY,
      column_categories.SPRING
    ]
  },
  {
    column_id: 'max_upload_speed_rank',
    column_name: 'max_upload_speed_rank',
    table_name: 'parcels_rank',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'max_upload_speed_rank',
    header_label: 'max_upload_speed_rank',
    column_groups: [
      column_categories.INTERNET,
      column_categories.INTERNET_SPEED,
      column_categories.INTERNET_UPLOAD
    ]
  },
  {
    column_id: 'closest_provider_distance_rank',
    column_name: 'closest_provider_distance_rank',
    table_name: 'parcels_rank',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'closest_provider_distance_rank',
    header_label: 'closest_provider_distance_rank',
    column_groups: [
      column_categories.INTERNET,
      column_categories.INTERNET_PROVIDER
    ]
  },
  {
    column_id: 'nearby_max_download_speed_rank',
    column_name: 'nearby_max_download_speed_rank',
    table_name: 'parcels_rank',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'nearby_max_download_speed_rank',
    header_label: 'nearby_max_download_speed_rank',
    column_groups: [
      column_categories.INTERNET,
      column_categories.INTERNET_SPEED,
      column_categories.INTERNET_DOWNLOAD
    ]
  },
  {
    column_id: 'nearby_max_upload_speed_rank',
    column_name: 'nearby_max_upload_speed_rank',
    table_name: 'parcels_rank',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'nearby_max_upload_speed_rank',
    header_label: 'nearby_max_upload_speed_rank',
    column_groups: [
      column_categories.INTERNET,
      column_categories.INTERNET_SPEED,
      column_categories.INTERNET_UPLOAD
    ]
  },
  {
    column_id: 'surrounding_coverage_density_rank',
    column_name: 'surrounding_coverage_density_rank',
    table_name: 'parcels_rank',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'surrounding_coverage_density_rank',
    header_label: 'surrounding_coverage_density_rank',
    column_groups: [
      column_categories.INTERNET,
      column_categories.INTERNET_COVERAGE
    ]
  },
  {
    column_id: 'geoid',
    column_name: 'geoid',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'geoid',
    header_label: 'geoid',
    column_groups: [column_categories.PROPERTY, column_categories.PARCEL_ID]
  },
  {
    column_id: 'sourceagent',
    column_name: 'sourceagent',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'sourceagent',
    header_label: 'sourceagent',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'parcelnumb',
    column_name: 'parcelnumb',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'parcelnumb',
    header_label: 'parcelnumb',
    column_groups: [column_categories.PROPERTY, column_categories.PARCEL_ID]
  },
  {
    column_id: 'usecode',
    column_name: 'usecode',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'usecode',
    header_label: 'usecode',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'usedesc',
    column_name: 'usedesc',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'usedesc',
    header_label: 'usedesc',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'zoning',
    column_name: 'zoning',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'zoning',
    header_label: 'zoning',
    column_groups: [column_categories.PROPERTY, column_categories.ZONING]
  },
  {
    column_id: 'zoning_description',
    column_name: 'zoning_description',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'zoning_description',
    header_label: 'zoning_description',
    column_groups: [column_categories.PROPERTY, column_categories.ZONING]
  },
  {
    column_id: 'closest_provider_h3_res8_id',
    column_name: 'closest_provider_h3_res8_id',
    table_name: 'parcels_internet',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'closest_provider_h3_res8_id',
    header_label: 'closest_provider_h3_res8_id',
    column_groups: [
      column_categories.INTERNET,
      column_categories.INTERNET_PROVIDER
    ]
  },
  {
    column_id: 'll_uuid',
    column_name: 'll_uuid',
    table_name: 'parcels_road',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'll_uuid',
    header_label: 'll_uuid',
    column_groups: [column_categories.PROPERTY, column_categories.PARCEL_ID]
  },
  {
    column_id: 'closest_pollution_name',
    column_name: 'closest_pollution_name',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'closest_pollution_name',
    header_label: 'closest_pollution_name',
    column_groups: [column_categories.POLLUTION]
  },
  {
    column_id: 'closest_pollution_distance',
    column_name: 'closest_pollution_distance',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'closest_pollution_distance',
    header_label: 'closest_pollution_distance',
    column_groups: [column_categories.POLLUTION]
  },
  {
    column_id: 'closest_pollution_tags',
    column_name: 'closest_pollution_tags',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'closest_pollution_tags',
    header_label: 'closest_pollution_tags',
    column_groups: [column_categories.POLLUTION]
  },
  {
    column_id: 'structstyle',
    column_name: 'structstyle',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'structstyle',
    header_label: 'structstyle',
    column_groups: [column_categories.PROPERTY, column_categories.STRUCTURE]
  },
  {
    column_id: 'parvaltype',
    column_name: 'parvaltype',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'parvaltype',
    header_label: 'parvaltype',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'ptype',
    column_name: 'ptype',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'ptype',
    header_label: 'ptype',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'sdatwebadr',
    column_name: 'sdatwebadr',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'sdatwebadr',
    header_label: 'sdatwebadr',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'polyid',
    column_name: 'polyid',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'polyid',
    header_label: 'polyid',
    column_groups: [column_categories.PROPERTY, column_categories.PARCEL_ID]
  },
  {
    column_id: 'qoz',
    column_name: 'qoz',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'qoz',
    header_label: 'qoz',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'qoz_tract',
    column_name: 'qoz_tract',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'qoz_tract',
    header_label: 'qoz_tract',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'taxyear',
    column_name: 'taxyear',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'taxyear',
    header_label: 'taxyear',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'owntype',
    column_name: 'owntype',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'owntype',
    header_label: 'owntype',
    column_groups: [column_categories.PROPERTY, column_categories.OWNERSHIP]
  },
  {
    column_id: 'owner',
    column_name: 'owner',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'owner',
    header_label: 'owner',
    column_groups: [column_categories.PROPERTY, column_categories.OWNERSHIP]
  },
  {
    column_id: 'owner_index',
    column_name: 'owner_index',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'owner_index',
    header_label: 'owner_index',
    column_groups: [column_categories.PROPERTY, column_categories.OWNERSHIP]
  },
  {
    column_id: 'ownfrst',
    column_name: 'ownfrst',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'ownfrst',
    header_label: 'ownfrst',
    column_groups: [column_categories.PROPERTY, column_categories.OWNERSHIP]
  },
  {
    column_id: 'ownlast',
    column_name: 'ownlast',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'ownlast',
    header_label: 'ownlast',
    column_groups: [column_categories.PROPERTY, column_categories.OWNERSHIP]
  },
  {
    column_id: 'owner2',
    column_name: 'owner2',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'owner2',
    header_label: 'owner2',
    column_groups: [column_categories.PROPERTY, column_categories.OWNERSHIP]
  },
  {
    column_id: 'owner3',
    column_name: 'owner3',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'owner3',
    header_label: 'owner3',
    column_groups: [column_categories.PROPERTY, column_categories.OWNERSHIP]
  },
  {
    column_id: 'owner4',
    column_name: 'owner4',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'owner4',
    header_label: 'owner4',
    column_groups: [column_categories.PROPERTY, column_categories.OWNERSHIP]
  },
  {
    column_id: 'subsurfown',
    column_name: 'subsurfown',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'subsurfown',
    header_label: 'subsurfown',
    column_groups: [column_categories.PROPERTY, column_categories.OWNERSHIP]
  },
  {
    column_id: 'subowntype',
    column_name: 'subowntype',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'subowntype',
    header_label: 'subowntype',
    column_groups: [column_categories.PROPERTY, column_categories.OWNERSHIP]
  },
  {
    column_id: 'mailadd',
    column_name: 'mailadd',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'mailadd',
    header_label: 'mailadd',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'mail_address2',
    column_name: 'mail_address2',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'mail_address2',
    header_label: 'mail_address2',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'careof',
    column_name: 'careof',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'careof',
    header_label: 'careof',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'mail_addno',
    column_name: 'mail_addno',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'mail_addno',
    header_label: 'mail_addno',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'mail_addpref',
    column_name: 'mail_addpref',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'mail_addpref',
    header_label: 'mail_addpref',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'mail_addstr',
    column_name: 'mail_addstr',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'mail_addstr',
    header_label: 'mail_addstr',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'mail_addsttyp',
    column_name: 'mail_addsttyp',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'mail_addsttyp',
    header_label: 'mail_addsttyp',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'mail_addstsuf',
    column_name: 'mail_addstsuf',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'mail_addstsuf',
    header_label: 'mail_addstsuf',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'mail_unit',
    column_name: 'mail_unit',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'mail_unit',
    header_label: 'mail_unit',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'mail_city',
    column_name: 'mail_city',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'mail_city',
    header_label: 'mail_city',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'mail_state2',
    column_name: 'mail_state2',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'mail_state2',
    header_label: 'mail_state2',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'mail_zip',
    column_name: 'mail_zip',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'mail_zip',
    header_label: 'mail_zip',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'mail_country',
    column_name: 'mail_country',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'mail_country',
    header_label: 'mail_country',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'mail_urbanization',
    column_name: 'mail_urbanization',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'mail_urbanization',
    header_label: 'mail_urbanization',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'address',
    column_name: 'address',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'address',
    header_label: 'address',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'address2',
    column_name: 'address2',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'address2',
    header_label: 'address2',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'saddno',
    column_name: 'saddno',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'saddno',
    header_label: 'saddno',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'saddpref',
    column_name: 'saddpref',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'saddpref',
    header_label: 'saddpref',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'saddstr',
    column_name: 'saddstr',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'saddstr',
    header_label: 'saddstr',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'saddsttyp',
    column_name: 'saddsttyp',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'saddsttyp',
    header_label: 'saddsttyp',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'saddstsuf',
    column_name: 'saddstsuf',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'saddstsuf',
    header_label: 'saddstsuf',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'sunit',
    column_name: 'sunit',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'sunit',
    header_label: 'sunit',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'scity',
    column_name: 'scity',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'scity',
    header_label: 'scity',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'original_address',
    column_name: 'original_address',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'original_address',
    header_label: 'original_address',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'city',
    column_name: 'city',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'city',
    header_label: 'city',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'county',
    column_name: 'county',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'county',
    header_label: 'county',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'state2',
    column_name: 'state2',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'state2',
    header_label: 'state2',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'szip',
    column_name: 'szip',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'szip',
    header_label: 'szip',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'urbanization',
    column_name: 'urbanization',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'urbanization',
    header_label: 'urbanization',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'location_name',
    column_name: 'location_name',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'location_name',
    header_label: 'location_name',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'address_source',
    column_name: 'address_source',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'address_source',
    header_label: 'address_source',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'legaldesc',
    column_name: 'legaldesc',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'legaldesc',
    header_label: 'legaldesc',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'plat',
    column_name: 'plat',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'plat',
    header_label: 'plat',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'book',
    column_name: 'book',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'book',
    header_label: 'book',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'page',
    column_name: 'page',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'page',
    header_label: 'page',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'block',
    column_name: 'block',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'block',
    header_label: 'block',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'lot',
    column_name: 'lot',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'lot',
    header_label: 'lot',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'neighborhood',
    column_name: 'neighborhood',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'neighborhood',
    header_label: 'neighborhood',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'subdivision',
    column_name: 'subdivision',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'subdivision',
    header_label: 'subdivision',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'hardiness_zone',
    column_name: 'hardiness_zone',
    table_name: 'parcels_agriculture',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'hardiness_zone',
    header_label: 'hardiness_zone',
    column_groups: [
      column_categories.AGRICULTURE,
      column_categories.PLANT_HARDINESS
    ]
  },
  {
    column_id: 'closest_library_name',
    column_name: 'closest_library_name',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'closest_library_name',
    header_label: 'closest_library_name',
    column_groups: [column_categories.LOCATION, column_categories.LIBRARY]
  },
  {
    column_id: 'goz',
    column_name: 'goz',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'goz',
    header_label: 'goz',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'goz_tract',
    column_name: 'goz_tract',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'goz_tract',
    header_label: 'goz_tract',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'census_tract',
    column_name: 'census_tract',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'census_tract',
    header_label: 'census_tract',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'census_block',
    column_name: 'census_block',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'census_block',
    header_label: 'census_block',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'census_blockgroup',
    column_name: 'census_blockgroup',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'census_blockgroup',
    header_label: 'census_blockgroup',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'sourceref',
    column_name: 'sourceref',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'sourceref',
    header_label: 'sourceref',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'sourceurl',
    column_name: 'sourceurl',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'sourceurl',
    header_label: 'sourceurl',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'recrdareatx',
    column_name: 'recrdareatx',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'recrdareatx',
    header_label: 'recrdareatx',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'closest_library_distance',
    column_name: 'closest_library_distance',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'closest_library_distance',
    header_label: 'closest_library_distance',
    column_groups: [column_categories.LOCATION, column_categories.LIBRARY]
  },
  {
    column_id: 'abbrev',
    column_name: 'abbrev',
    table_name: 'parcels_airport',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'abbrev',
    header_label: 'abbrev',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DISTANCE_TO_FEATURES,
      column_categories.AIRPORT
    ]
  },
  {
    column_id: 'closest_library_tags',
    column_name: 'closest_library_tags',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'closest_library_tags',
    header_label: 'closest_library_tags',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DISTANCE_TO_FEATURES,
      column_categories.LIBRARY
    ]
  },
  {
    column_id: 'closest_spring_name',
    column_name: 'closest_spring_name',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'closest_spring_name',
    header_label: 'closest_spring_name',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DISTANCE_TO_FEATURES,
      column_categories.SPRING
    ]
  },
  {
    column_id: 'closest_geological_features_name',
    column_name: 'closest_geological_features_name',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'closest_geological_features_name',
    header_label: 'closest_geological_features_name',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DISTANCE_TO_FEATURES,
      column_categories.GEOLOGIC_FEATURES
    ]
  },
  {
    column_id: 'cdl_raw',
    column_name: 'cdl_raw',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'cdl_raw',
    header_label: 'cdl_raw',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'cdl_majority_category',
    column_name: 'cdl_majority_category',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'cdl_majority_category',
    header_label: 'cdl_majority_category',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'closest_geological_features_distance',
    column_name: 'closest_geological_features_distance',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'closest_geological_features_distance',
    header_label: 'closest_geological_features_distance',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DISTANCE_TO_FEATURES,
      column_categories.GEOLOGIC_FEATURES
    ]
  },
  {
    column_id: 'cdl_date',
    column_name: 'cdl_date',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'cdl_date',
    header_label: 'cdl_date',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'closest_geological_features_tags',
    column_name: 'closest_geological_features_tags',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'closest_geological_features_tags',
    header_label: 'closest_geological_features_tags',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DISTANCE_TO_FEATURES,
      column_categories.GEOLOGIC_FEATURES
    ]
  },
  {
    column_id: 'path',
    column_name: 'path',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'path',
    header_label: 'path',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'll_stable_id',
    column_name: 'll_stable_id',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'll_stable_id',
    header_label: 'll_stable_id',
    column_groups: [column_categories.PROPERTY, column_categories.PARCEL_ID]
  },
  {
    column_id: 'dpv_status',
    column_name: 'dpv_status',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'dpv_status',
    header_label: 'dpv_status',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'dpv_codes',
    column_name: 'dpv_codes',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'dpv_codes',
    header_label: 'dpv_codes',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'dpv_notes',
    column_name: 'dpv_notes',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'dpv_notes',
    header_label: 'dpv_notes',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'dpv_type',
    column_name: 'dpv_type',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'dpv_type',
    header_label: 'dpv_type',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'cass_errorno',
    column_name: 'cass_errorno',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'cass_errorno',
    header_label: 'cass_errorno',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'rdi',
    column_name: 'rdi',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'rdi',
    header_label: 'rdi',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'usps_vacancy',
    column_name: 'usps_vacancy',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'usps_vacancy',
    header_label: 'usps_vacancy',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'closest_spring_tags',
    column_name: 'closest_spring_tags',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'closest_spring_tags',
    header_label: 'closest_spring_tags',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DISTANCE_TO_FEATURES,
      column_categories.SPRING
    ]
  },
  {
    column_id: 'lbcs_activity_desc',
    column_name: 'lbcs_activity_desc',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'lbcs_activity_desc',
    header_label: 'lbcs_activity_desc',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'closest_natural_name',
    column_name: 'closest_natural_name',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'closest_natural_name',
    header_label: 'closest_natural_name',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DISTANCE_TO_FEATURES,
      column_categories.NATURAL
    ]
  },
  {
    column_id: 'lbcs_function_desc',
    column_name: 'lbcs_function_desc',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'lbcs_function_desc',
    header_label: 'lbcs_function_desc',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'closest_natural_distance',
    column_name: 'closest_natural_distance',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'closest_natural_distance',
    header_label: 'closest_natural_distance',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DISTANCE_TO_FEATURES,
      column_categories.NATURAL
    ]
  },
  {
    column_id: 'lbcs_structure_desc',
    column_name: 'lbcs_structure_desc',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'lbcs_structure_desc',
    header_label: 'lbcs_structure_desc',
    column_groups: [column_categories.PROPERTY, column_categories.STRUCTURE]
  },
  {
    column_id: 'closest_natural_tags',
    column_name: 'closest_natural_tags',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'closest_natural_tags',
    header_label: 'closest_natural_tags',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DISTANCE_TO_FEATURES,
      column_categories.NATURAL
    ]
  },
  {
    column_id: 'lbcs_site_desc',
    column_name: 'lbcs_site_desc',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'lbcs_site_desc',
    header_label: 'lbcs_site_desc',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'closest_water_name',
    column_name: 'closest_water_name',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'closest_water_name',
    header_label: 'closest_water_name',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DISTANCE_TO_FEATURES,
      column_categories.WATER
    ]
  },
  {
    column_id: 'lbcs_ownership_desc',
    column_name: 'lbcs_ownership_desc',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'lbcs_ownership_desc',
    header_label: 'lbcs_ownership_desc',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'padus_public_access',
    column_name: 'padus_public_access',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'padus_public_access',
    header_label: 'padus_public_access',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'homestead_exemption',
    column_name: 'homestead_exemption',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'homestead_exemption',
    header_label: 'homestead_exemption',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'closest_water_distance',
    column_name: 'closest_water_distance',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'closest_water_distance',
    header_label: 'closest_water_distance',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DISTANCE_TO_FEATURES,
      column_categories.WATER
    ]
  },
  {
    column_id: 'jurscode',
    column_name: 'jurscode',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'jurscode',
    header_label: 'jurscode',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'acctid_county_stripped',
    column_name: 'acctid_county_stripped',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'acctid_county_stripped',
    header_label: 'acctid_county_stripped',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'geogcode',
    column_name: 'geogcode',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'geogcode',
    header_label: 'geogcode',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'ooi',
    column_name: 'ooi',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'ooi',
    header_label: 'ooi',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'resityp',
    column_name: 'resityp',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'resityp',
    header_label: 'resityp',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'addrtyp',
    column_name: 'addrtyp',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'addrtyp',
    header_label: 'addrtyp',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'namekey',
    column_name: 'namekey',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'namekey',
    header_label: 'namekey',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'dr1clerk',
    column_name: 'dr1clerk',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'dr1clerk',
    header_label: 'dr1clerk',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'towncode',
    column_name: 'towncode',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'towncode',
    header_label: 'towncode',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'desctown',
    column_name: 'desctown',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'desctown',
    header_label: 'desctown',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'subdivision_code',
    column_name: 'subdivision_code',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'subdivision_code',
    header_label: 'subdivision_code',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'detailed_subdivision_code',
    column_name: 'detailed_subdivision_code',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'detailed_subdivision_code',
    header_label: 'detailed_subdivision_code',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'dr1liber',
    column_name: 'dr1liber',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'dr1liber',
    header_label: 'dr1liber',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'dr1folio',
    column_name: 'dr1folio',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'dr1folio',
    header_label: 'dr1folio',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'section',
    column_name: 'section',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'section',
    header_label: 'section',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'map',
    column_name: 'map',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'map',
    header_label: 'map',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'grid',
    column_name: 'grid',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'grid',
    header_label: 'grid',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'closest_water_tags',
    column_name: 'closest_water_tags',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'closest_water_tags',
    header_label: 'closest_water_tags',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DISTANCE_TO_FEATURES,
      column_categories.WATER
    ]
  },
  {
    column_id: 'closest_religious_name',
    column_name: 'closest_religious_name',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'closest_religious_name',
    header_label: 'closest_religious_name',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DISTANCE_TO_FEATURES,
      column_categories.RELIGIOUS
    ]
  },
  {
    column_id: 'ciuse',
    column_name: 'ciuse',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'ciuse',
    header_label: 'ciuse',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'descciuse',
    column_name: 'descciuse',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'descciuse',
    header_label: 'descciuse',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'exclass',
    column_name: 'exclass',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'exclass',
    header_label: 'exclass',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'descexcl',
    column_name: 'descexcl',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'descexcl',
    header_label: 'descexcl',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'luom',
    column_name: 'luom',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'luom',
    header_label: 'luom',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'closest_healthcare_name',
    column_name: 'closest_healthcare_name',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'closest_healthcare_name',
    header_label: 'closest_healthcare_name',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DISTANCE_TO_FEATURES,
      column_categories.HEALTHCARE
    ]
  },
  {
    column_id: 'closest_healthcare_distance',
    column_name: 'closest_healthcare_distance',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'closest_healthcare_distance',
    header_label: 'closest_healthcare_distance',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DISTANCE_TO_FEATURES,
      column_categories.HEALTHCARE
    ]
  },
  {
    column_id: 'pfuw',
    column_name: 'pfuw',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'pfuw',
    header_label: 'pfuw',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'pfus',
    column_name: 'pfus',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'pfus',
    header_label: 'pfus',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'pflw',
    column_name: 'pflw',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'pflw',
    header_label: 'pflw',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'pfsp',
    column_name: 'pfsp',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'pfsp',
    header_label: 'pfsp',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'pfsu',
    column_name: 'pfsu',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'pfsu',
    header_label: 'pfsu',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'pfic',
    column_name: 'pfic',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'pfic',
    header_label: 'pfic',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'pfih',
    column_name: 'pfih',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'pfih',
    header_label: 'pfih',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'recind',
    column_name: 'recind',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'recind',
    header_label: 'recind',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'permittyp',
    column_name: 'permittyp',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'permittyp',
    header_label: 'permittyp',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'strugrad',
    column_name: 'strugrad',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'strugrad',
    header_label: 'strugrad',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'descgrad',
    column_name: 'descgrad',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'descgrad',
    header_label: 'descgrad',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'strucnst',
    column_name: 'strucnst',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'strucnst',
    header_label: 'strucnst',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'desccnst',
    column_name: 'desccnst',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'desccnst',
    header_label: 'desccnst',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'strustyl',
    column_name: 'strustyl',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'strustyl',
    header_label: 'strustyl',
    column_groups: [column_categories.PROPERTY, column_categories.STRUCTURE]
  },
  {
    column_id: 'strubldg',
    column_name: 'strubldg',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'strubldg',
    header_label: 'strubldg',
    column_groups: [column_categories.PROPERTY, column_categories.STRUCTURE]
  },
  {
    column_id: 'descbldg',
    column_name: 'descbldg',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'descbldg',
    header_label: 'descbldg',
    column_groups: [column_categories.PROPERTY, column_categories.STRUCTURE]
  },
  {
    column_id: 'closest_healthcare_tags',
    column_name: 'closest_healthcare_tags',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'closest_healthcare_tags',
    header_label: 'closest_healthcare_tags',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DISTANCE_TO_FEATURES,
      column_categories.HEALTHCARE
    ]
  },
  {
    column_id: 'closest_religious_distance',
    column_name: 'closest_religious_distance',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'closest_religious_distance',
    header_label: 'closest_religious_distance',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DISTANCE_TO_FEATURES,
      column_categories.RELIGIOUS
    ]
  },
  {
    column_id: 'assessor',
    column_name: 'assessor',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'assessor',
    header_label: 'assessor',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'transno1',
    column_name: 'transno1',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'transno1',
    header_label: 'transno1',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'grntnam1',
    column_name: 'grntnam1',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'grntnam1',
    header_label: 'grntnam1',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'gr1clrk1v',
    column_name: 'gr1clrk1v',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'gr1clrk1v',
    header_label: 'gr1clrk1v',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'gr1libr1',
    column_name: 'gr1libr1',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'gr1libr1',
    header_label: 'gr1libr1',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'gr1folo1',
    column_name: 'gr1folo1',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'gr1folo1',
    header_label: 'gr1folo1',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'convey1',
    column_name: 'convey1',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'convey1',
    header_label: 'convey1',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'mortgag1',
    column_name: 'mortgag1',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'mortgag1',
    header_label: 'mortgag1',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'crtarcod',
    column_name: 'crtarcod',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'crtarcod',
    header_label: 'crtarcod',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'fcmacode',
    column_name: 'fcmacode',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'fcmacode',
    header_label: 'fcmacode',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'closest_military_name',
    column_name: 'closest_military_name',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'closest_military_name',
    header_label: 'closest_military_name',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DISTANCE_TO_FEATURES,
      column_categories.MILITARY
    ]
  },
  {
    column_id: 'agfndluom',
    column_name: 'agfndluom',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'agfndluom',
    header_label: 'agfndluom',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'closest_religious_tags',
    column_name: 'closest_religious_tags',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'closest_religious_tags',
    header_label: 'closest_religious_tags',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DISTANCE_TO_FEATURES,
      column_categories.RELIGIOUS
    ]
  },
  {
    column_id: 'closest_military_tags',
    column_name: 'closest_military_tags',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'closest_military_tags',
    header_label: 'closest_military_tags',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DISTANCE_TO_FEATURES,
      column_categories.MILITARY
    ]
  },
  {
    column_id: 'closest_public_land_name',
    column_name: 'closest_public_land_name',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'closest_public_land_name',
    header_label: 'closest_public_land_name',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DISTANCE_TO_FEATURES,
      column_categories.PUBLIC_LAND
    ]
  },
  {
    column_id: 'closest_public_land_distance',
    column_name: 'closest_public_land_distance',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'closest_public_land_distance',
    header_label: 'closest_public_land_distance',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DISTANCE_TO_FEATURES,
      column_categories.PUBLIC_LAND
    ]
  },
  {
    column_id: 'nprcluom',
    column_name: 'nprcluom',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'nprcluom',
    header_label: 'nprcluom',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'homqlcod',
    column_name: 'homqlcod',
    table_name: 'parcels',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'homqlcod',
    header_label: 'homqlcod',
    column_groups: [column_categories.PROPERTY]
  },
  {
    column_id: 'closest_public_land_tags',
    column_name: 'closest_public_land_tags',
    table_name: 'parcels_density',
    data_type: table_constants.TABLE_DATA_TYPES.TEXT,
    accessorKey: 'closest_public_land_tags',
    header_label: 'closest_public_land_tags',
    column_groups: [
      column_categories.LOCATION,
      column_categories.DISTANCE_TO_FEATURES,
      column_categories.PUBLIC_LAND
    ]
  },
  {
    column_id: 'election_year',
    column_name: 'election_year',
    table_name: 'parcels_election_results',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'election_year',
    header_label: 'election_year',
    column_groups: [column_categories.ELECTION_RESULTS],
    column_params: {
      year: election_results_single_year
    }
  },
  {
    column_id: 'votes_dem',
    column_name: 'votes_dem',
    table_name: 'parcels_election_results',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'votes_dem',
    header_label: 'votes_dem',
    column_groups: [column_categories.ELECTION_RESULTS],
    column_params: {
      year: election_results_single_year
    }
  },
  {
    column_id: 'votes_rep',
    column_name: 'votes_rep',
    table_name: 'parcels_election_results',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'votes_rep',
    header_label: 'votes_rep',
    column_groups: [column_categories.ELECTION_RESULTS],
    column_params: {
      year: election_results_single_year
    }
  },
  {
    column_id: 'votes_total',
    column_name: 'votes_total',
    table_name: 'parcels_election_results',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'votes_total',
    header_label: 'votes_total',
    column_groups: [column_categories.ELECTION_RESULTS],
    column_params: {
      year: election_results_single_year
    }
  },
  {
    column_id: 'pct_dem_lead',
    column_name: 'pct_dem_lead',
    table_name: 'parcels_election_results',
    data_type: table_constants.TABLE_DATA_TYPES.NUMBER,
    accessorKey: 'pct_dem_lead',
    header_label: 'pct_dem_lead',
    column_groups: [column_categories.ELECTION_RESULTS],
    column_params: {
      year: election_results_single_year
    }
  }
]
