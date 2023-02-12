DROP TABLE IF EXISTS `properties`;

CREATE TABLE `properties` (
  `ogc_fid` serial comment 'object id',
  `name` varchar(50),
  `postal` varchar(10),
  `classes` varchar(30),
  `headline` varchar(50),
  `path` varchar(100),
  `sqmi` decimal(20, 8),
  `num_parcels` int,
  `num_owners` int,
  `import_cursor` int,
  PRIMARY KEY (`ogc_fid`),
  UNIQUE (`path`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `parcels`;

CREATE TABLE `parcels` (
  `ogc_fid` serial comment 'object id',
  `geoid` text comment 'FIPS code',
  `sourceagent` text comment 'Source Agent',
  `parcelnumb` text comment 'Parcel ID',
  `usecode` text comment 'Parcel Use Code',
  `usedesc` text comment 'Parcel Use Description',
  `zoning` text comment 'Zoning Code',
  `zoning_description` text comment 'Zoning description',
  `struct` boolean comment 'Structure on Parcel',
  `multistruct` boolean comment 'Multiple structures on Parcel',
  `structno` int comment 'Number of structures on parcel',
  `yearbuilt` int(4) comment 'Structure Year Built',
  `numstories` double precision comment 'Number of Stories',
  `numunits` smallint unsigned comment 'Number of Units',
  `structstyle` text comment 'Structure Style',
  `parvaltype` text comment 'Parcel Value Type',
  `improvval` double precision comment 'Improvement Value',
  `landval` double precision comment 'Land Value',
  `parval` double precision comment 'Total Parcel Value',
  `agval` double precision comment 'Agricultural Value',
  `saleprice` double precision comment 'Last sale price',
  `saledate` date comment 'Last sale date',
  `taxamt` double precision comment 'Annual Tax Bill',
  `taxyear` text comment 'A county provided attribute indicating the tax year the assessor data applies to',
  `owntype` text comment 'Owner Type',
  `owner` text comment 'Owner Name',
  `owner_index` varchar(200) DEFAULT NULL,
  `ownfrst` text comment 'Owner First Name',
  `ownlast` text comment 'Owner Last Name',
  `owner2` text comment 'Second Owner Name',
  `owner3` text comment 'Third Owner Name',
  `owner4` text comment 'Fourth Owner Name',
  `subsurfown` text comment 'Subsurface Owner',
  `subowntype` text comment 'Subsurface Owner Type',
  `mailadd` text comment 'Mailing Address',
  `mail_address2` text comment 'Mailing Address Second Line',
  `careof` text comment 'Mailing Address Care of',
  `mail_addno` text comment 'Mailing Address Street Number',
  `mail_addpref` text comment 'Mailing Address Street Prefix',
  `mail_addstr` text comment 'Mailing Address Street Name',
  `mail_addsttyp` text comment 'Mailing Address Street Type',
  `mail_addstsuf` text comment 'Mailing Address Street Suffix',
  `mail_unit` text comment 'Mailing Address Unit Number',
  `mail_city` text comment 'Mailing Address City',
  `mail_state2` text comment 'Mailing Address State',
  `mail_zip` text comment 'Mailing Address ZIP Code',
  `mail_country` text comment 'Mailing Address Country',
  `mail_urbanization` text comment 'Mailing Address Urbanizacion (Puerto Rico)',
  `address` text comment 'Parcel Address',
  `address2` text comment 'Parcel Address Second Line',
  `saddno` text comment 'Parcel Address Number',
  `saddpref` text comment 'Parcel Address Prefix',
  `saddstr` text comment 'Parcel Address Street Name',
  `saddsttyp` text comment 'Parcel Address Street Type',
  `saddstsuf` text comment 'Parcel Address Street Suffix',
  `sunit` text comment 'Parcel Address Unit',
  `scity` text comment 'Parcel Address City',
  `original_address` text comment 'Address fields as originally provided by the county, separated by a semicolon and a space',
  `city` text comment 'US Census County Subdivision',
  `county` text comment 'Parcel Address County',
  `state2` text comment 'Parcel Address State',
  `szip` text comment 'Parcel Address Zip Code',
  `urbanization` text comment 'A postal address field commonly used in Puerto Rico',
  `location_name` text comment 'Location Name',
  `address_source` text comment 'Primary Address Source',
  `legaldesc` text comment 'Legal Description',
  `plat` text comment 'Plat number the parcel is recorded on',
  `book` text comment 'Book/Liber the parcel is recorded in',
  `page` text comment 'Page/Folio the parcel is recorded on',
  `block` text comment 'Block',
  `lot` text comment 'Lot',
  `neighborhood` text comment 'Neighborhood',
  `subdivision` text comment 'Subdivision',
  `lat` text comment 'On parcel centroid latitude decimal coordinate',
  `lon` text comment 'On parcel centroid longitude decimal coordinate',
  `goz` text comment 'Federal Qualified Opportunity Zone',
  `goz_tract` text comment 'Qualified Opportunity Zone Tract Number',
  `census_tract` text comment 'Census 2010 Tract',
  `census_block` text comment 'Census 2010 Block',
  `census_blockgroup` text comment 'Census 2010 Blockgroup',
  `sourceref` text comment 'A county provided reference for the parcel record',
  `sourcedate` date comment 'A county provided date for the parcel record',
  `sourceurl` text comment 'A county provided url to the county parcel record online',
  `recrdareatx` text comment 'Recorded Area (text)',
  `recrdareano` double precision comment 'Recorded Area (number)',
  `gisacre` double precision comment 'County-provided Acres',
  `sqft` double precision comment 'County-provided Parcel Square Feet',
  `ll_gisacre` double precision comment 'Loveland calculated parcel areas',
  `ll_gissqft` bigint comment 'Loveland calculated parcel square feet',
  `ll_bldg_footprint_sqft` int comment 'Loveland calculated building footprint square feet',
  `ll_bldg_count` int comment 'Total number of buildings on the parcel, calculated by loveland',
  `cdl_raw` text comment 'Cropland Data Layer raw values',
  `cdl_majority_category` text comment 'This is the human readable Category name for the land cover type that is most common on the parcel',
  `cdl_majority_percent` double precision comment 'This is the actual percentage of pixels for the majority category',
  `cdl_date` text comment 'The year of the Cropland Data Layer data set the current attributes are derived from',
  `revisedate` date comment 'The last date of last revision as provided by the county assessors office if available',
  `path` text comment 'Lovelands human-readable identifier for this parcel. Not guaranteed to be stable between updates',
  `ll_stable_id` text comment 'Stable ID Status',
  `ll_uuid` varchar(36) comment 'Uniquely identifies a single parcel with a v4 uuid. A stable parcel id across county data refreshes. This field should be used for tracking indiviual parcels.',
  `ll_updated_at` timestamp comment 'Timestamp of last update of any kind to this row, internal changes to row, and/or county updates',
  `dpv_status` text comment 'USPS Delivary Point Validation',
  `dpv_codes` text comment 'Delivery Point Validation Codes',
  `dpv_notes` text comment 'Delivery Point Validation Notes',
  `dpv_type` text comment 'Delivery Point Match Type',
  `cass_errorno` text comment 'CASS Error Codes',
  `rdi` text comment 'Residential Delivary Indicator',
  `usps_vacancy` text comment 'USPS Vacancy Indicator',
  `usps_vacancy_date` date comment 'USPS Vacancy Indicator Date',
  `lbcs_activity` numeric comment 'Land Use Code: Activity',
  `lbcs_activity_desc` text comment 'Land Use Code Description: Activity',
  `lbcs_function` numeric comment 'Land Use Code: Function',
  `lbcs_function_desc` text comment 'Land Use Code Description: Function',
  `lbcs_structure` numeric comment 'Land Use Code: Structure',
  `lbcs_structure_desc` text comment 'Land Use Code Description: Structure',
  `lbcs_site` numeric comment 'Land Use Code: Site',
  `lbcs_site_desc` text comment 'Land Use Code Description: Site',
  `lbcs_ownership` numeric comment 'Land Use Code: Ownership',
  `lbcs_ownership_desc` text comment 'Land Use Code Description: Ownership',
  `padus_public_access` text comment 'PAD-US Public Access Designation',
  `homestead_exemption` text comment 'Homestead Exemption',
  `reviseddate` date comment 'Date of Last Revision',
  `jurscode` text comment 'Jurisdiction Code',
  `acctid_county_stripped` text comment 'Account ID Without County Prefix',
  `geogcode` text comment 'Geographic Code',
  `ooi` text comment 'Owner Occupied Indicator',
  `resityp` text comment 'Residential Address Type Code',
  `addrtyp` text comment 'Address Source Indicator',
  `namekey` text comment 'Owner Name Key',
  `dr1clerk` text comment 'Deed Clerk',
  `towncode` text comment 'Town Code',
  `desctown` text comment 'Town Code Description',
  `subdivision_code` text comment 'Subdivision Code',
  `detailed_subdivision_code` text comment 'Detailed Subdivision Code',
  `dr1liber` text comment 'Deed Liber',
  `dr1folio` text comment 'Deed Folio',
  `section` text comment 'Section',
  `map` text comment 'Map',
  `grid` text comment 'Grid',
  `zoning_change_date` date comment 'Zoning Change Date' ,
  `rzrealdat` date comment 'Rezoned Reality Date',
  `ciuse` text comment 'Commercial and Industrial Property Use Code',
  `descciuse` text comment 'Commercial and Industrial Property Description',
  `exclass` text comment 'Exemption Class Code',
  `descexcl` text comment 'Exemption Class Description',
  `luom` text comment 'Land Area Unit',
  `width` double precision comment 'Width',
  `depth` double precision comment 'Depth',
  `pfuw` text comment 'Public Water',
  `pfus` text comment 'Public Sewer',
  `pflw` text comment 'Waterfront',
  `pfsp` text comment 'Street Paved',
  `pfsu` text comment 'Street Unpaved',
  `pfic` text comment 'Property Factor Influece - Commerical Indicator',
  `pfih` text comment 'Property Factor Influence - Historical',
  `recind` text comment 'Recreation Influence Indicator',
  `permittyp` text comment 'Permit Type',
  `strugrad` text comment 'Construction Grade Code',
  `descgrad` text comment 'Construction Grade Description',
  `strucnst` text comment 'Construction Code',
  `desccnst` text comment 'Construction Description',
  `strustyl` text comment 'Building Style Code',
  `strubldg` text comment 'Building Type code',
  `descbldg` text comment 'Building Type Description',
  `lastinsp` date comment 'Last Date Inspected',
  `lastassd` date comment 'Last Date Assessed',
  `assessor` text comment 'Assessor Numeric Code',
  `transno1` text comment 'Sale Transfer Number',
  `grntnam1` text comment 'Sale Grantor Name',
  `gr1clrk1v` text comment 'Grantor Deed Clerk',
  `gr1libr1` text comment 'Grantor Liber',
  `gr1folo1` text comment 'Grantor Folio',
  `convey1` text comment 'How Conveyed',
  `mortgag1` text comment 'Mortgage',
  `crtarcod` text comment 'Critical Area Code',
  `fcmacode` text comment 'Forest Conservation Management Agreement Code',
  `agfndarea` double precision comment 'Agricultural Preservation Foundation Area',
  `agfndluom` text comment 'Agricultural Preservation Area Unit',
  `entzndat` date comment 'Enterprise Zone Date',
  `entznassm` double precision comment 'Enterprise Zone Assessment',
  `plndevdat` date comment 'PUD date',
  `nprctstdat` date comment 'Perc Test Date',
  `nprcarea` double precision comment 'Perc Test Area',
  `nprcluom` text comment 'Perc Test Area Unit',
  `homqlcod` text comment 'Homestead Tax Credit Application',
  `homqldat` date comment 'Homestead Tax Credit Date',
  `resident` double precision comment 'Resident',
  `resi2010` double precision comment 'Resident Property 2010',
  `resi2000` double precision comment 'Resident Property 2000',
  `resi1990` double precision comment 'Resident Property 1990',
  `resiuths` double precision comment 'Resident Property Low Value',
  `aprtment` double precision comment 'Apartment Residence',
  `trailer` double precision comment 'Trailer Residence',
  `special` double precision comment 'Special Residence',
  `other` double precision comment 'Other',
  `ptype` text comment 'Type of Digitized Parcel',
  `sdatwebadr` text comment 'SDAT URL',
  `polyid` text comment 'Polygon ID',
  `qoz` text comment 'Federal Qualified Opportunity Zone',
  `qoz_tract` text comment 'Qualified Opportunity Zone Tract Number',
  UNIQUE KEY `path` (`path`),
  KEY `gisacre` (`gisacre`),
  KEY `ll_gisacre` (`ll_gisacre`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `coordinates`;

CREATE TABLE `coordinates` (
  `lat` DECIMAL(8,6) comment 'latitude decimal coordinate',
  `lon` DECIMAL(9,6) comment 'longitude decimal coordinate',
  `elevation` text comment 'Estimated 90 meter digital elevation model is used',
  UNIQUE (`lat`, `lon`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `parcels_geometry`;

CREATE TABLE `parcels_geometry` (
  `path` varchar(300) NOT NULL,
  `coordinates` json NOT NULL,
  UNIQUE (`path`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `parcels_viewshed`;

CREATE TABLE `parcels_viewshed` (
  `path` varchar(300) NOT NULL,

  `latitude` DECIMAL(8,6) comment 'latitude decimal coordinate',
  `longitude` DECIMAL(9,6) comment 'longitude decimal coordinate',

  `viewshed_percentage` DECIMAL(5,2) NOT NULL,
  `viewshed_index` SMALLINT unsigned NOT NULL,
  `viewshed_index_under_2km` SMALLINT unsigned NOT NULL,
  `viewshed_index_2km` SMALLINT unsigned NOT NULL,
  `viewshed_index_5km` SMALLINT unsigned NOT NULL,
  `viewshed_index_10km` SMALLINT unsigned NOT NULL,
  `viewshed_index_20km` SMALLINT unsigned NOT NULL,
  `viewshed_index_50km` SMALLINT unsigned NOT NULL,
  `viewshed_index_75km` SMALLINT unsigned NOT NULL,

  `viewshed_nw` SMALLINT unsigned NOT NULL,
  `viewshed_sw` SMALLINT unsigned NOT NULL,
  `viewshed_se` SMALLINT unsigned NOT NULL,
  `viewshed_ne` SMALLINT unsigned NOT NULL,

  `viewshed_n` SMALLINT unsigned NOT NULL,
  `viewshed_e` SMALLINT unsigned NOT NULL,
  `viewshed_s` SMALLINT unsigned NOT NULL,
  `viewshed_w` SMALLINT unsigned NOT NULL,
  UNIQUE (`latitude`, `longitude`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `parcels_coastline`;

CREATE TABLE `parcels_coastline` (
  `path` varchar(300) NOT NULL,
  `distance_km` MEDIUMINT unsigned NOT NULL,
  UNIQUE (`path`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `parcels_airport`;

CREATE TABLE `parcels_airport` (
  `path` varchar(300) NOT NULL,
  `distance_km` MEDIUMINT unsigned NOT NULL,
  `abbrev` varchar(10) DEFAULT NULL,
  UNIQUE (`path`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `airports`;

CREATE TABLE `airports` (
  `latitude` DECIMAL(8,6) comment 'latitude decimal coordinate',
  `longitude` DECIMAL(9,6) comment 'longitude decimal coordinate',
  `type` varchar(100) DEFAULT NULL,
  `name` varchar(200) DEFAULT NULL,
  `abbrev` varchar(10) DEFAULT NULL,
  `gps_code` varchar(10) DEFAULT NULL,
  `iata_code` varchar(10) DEFAULT NULL,
  `wikipedia` varchar(300) DEFAULT NULL,
  UNIQUE KEY `abbrev` (`abbrev`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `parcels_elevation`;

CREATE TABLE `parcels_elevation` (
  `path` varchar(300) NOT NULL,
  `min` SMALLINT unsigned NOT NULL,
  `p10` SMALLINT unsigned NOT NULL,
  `p25` SMALLINT unsigned NOT NULL,
  `p50` SMALLINT unsigned NOT NULL,
  `p75` SMALLINT unsigned NOT NULL,
  `p90` SMALLINT unsigned NOT NULL,
  `max` SMALLINT unsigned NOT NULL,
  `median` SMALLINT unsigned NOT NULL,
  UNIQUE (`path`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `parcels_road`;

CREATE TABLE `parcels_road` (
  `path` varchar(300) NOT NULL,
  `road_km` DECIMAL(9,5) unsigned NOT NULL,
  `paved_km` DECIMAL(9,5) unsigned NOT NULL,
  `high_traffic_km` DECIMAL(9,5) unsigned NOT NULL,
  `highway_km` DECIMAL(9,5) unsigned NOT NULL,
  UNIQUE (`path`),
  KEY `highway_km` (`highway_km`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `roads`;

CREATE TABLE `roads` (
  `number` SMALLINT unsigned DEFAULT NULL,
  `road_class` varchar(16) DEFAULT NULL,
  `type` varchar(16) DEFAULT NULL,
  `divided` varchar(16) DEFAULT NULL,
  `country` varchar(36) DEFAULT NULL,
  `state` varchar(60) DEFAULT NULL,
  `length` DECIMAL(9,3) DEFAULT NULL,
  `continent` varchar(16) DEFAULT NULL,
  `lineString` json DEFAULT NULL,
  KEY `type` (`type`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `parcels_meta`;

CREATE TABLE `parcels_meta` (
  `path` varchar(300) NOT NULL,
  `public` tinyint DEFAULT NULL,
  `tribal` tinyint DEFAULT NULL,
  UNIQUE (`path`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `parcels_density`;

CREATE TABLE `parcels_density` (
  `path` varchar(300) NOT NULL,

  -- geological_features metrics

  `geological_features_updated` int(11) unsigned DEFAULT NULL,

  `closest_geological_features_name` varchar(300) DEFAULT NULL,
  `closest_geological_features_distance` varchar(300) DEFAULT NULL,
  `closest_geological_features_tags` varchar(300) DEFAULT NULL,
  `closest_geological_features_items` json DEFAULT NULL,

  `geological_features_1km` json DEFAULT NULL,
  `geological_features_count_1km` SMALLINT unsigned DEFAULT NULL,

  `geological_features_5km` json DEFAULT NULL,
  `geological_features_count_5km` SMALLINT unsigned DEFAULT NULL,

  `geological_features_10km` json DEFAULT NULL,
  `geological_features_count_10km` SMALLINT unsigned DEFAULT NULL,

  `geological_features_25km` json DEFAULT NULL,
  `geological_features_count_25km` SMALLINT unsigned DEFAULT NULL,

  -- healthcare metrics

  `healthcare_updated` int(11) unsigned DEFAULT NULL,

  `closest_healthcare_name` varchar(300) DEFAULT NULL,
  `closest_healthcare_distance` varchar(300) DEFAULT NULL,
  `closest_healthcare_tags` varchar(300) DEFAULT NULL,
  `closest_healthcare_items` json DEFAULT NULL,

  `healthcare_1km` json DEFAULT NULL,
  `healthcare_count_1km` SMALLINT unsigned DEFAULT NULL,

  `healthcare_5km` json DEFAULT NULL,
  `healthcare_count_5km` SMALLINT unsigned DEFAULT NULL,

  `healthcare_10km` json DEFAULT NULL,
  `healthcare_count_10km` SMALLINT unsigned DEFAULT NULL,

  `healthcare_25km` json DEFAULT NULL,
  `healthcare_count_25km` SMALLINT unsigned DEFAULT NULL,

  `healthcare_50km` json DEFAULT NULL,
  `healthcare_count_50km` SMALLINT unsigned DEFAULT NULL,

  `healthcare_100km` json DEFAULT NULL,
  `healthcare_count_100km` SMALLINT unsigned DEFAULT NULL,

  `healthcare_150km` json DEFAULT NULL,
  `healthcare_count_150km` SMALLINT unsigned DEFAULT NULL,

  `healthcare_200km` json DEFAULT NULL,
  `healthcare_count_200km` SMALLINT unsigned DEFAULT NULL,

  -- library metrics

  `library_updated` int(11) unsigned DEFAULT NULL,

  `closest_library_name` varchar(300) DEFAULT NULL,
  `closest_library_distance` varchar(300) DEFAULT NULL,
  `closest_library_tags` varchar(300) DEFAULT NULL,
  `closest_library_items` json DEFAULT NULL,

  `library_1km` json DEFAULT NULL,
  `library_count_1km` SMALLINT unsigned DEFAULT NULL,

  `library_5km` json DEFAULT NULL,
  `library_count_5km` SMALLINT unsigned DEFAULT NULL,

  `library_10km` json DEFAULT NULL,
  `library_count_10km` SMALLINT unsigned DEFAULT NULL,

  `library_25km` json DEFAULT NULL,
  `library_count_25km` SMALLINT unsigned DEFAULT NULL,

  `library_50km` json DEFAULT NULL,
  `library_count_50km` SMALLINT unsigned DEFAULT NULL,

  -- military metrics

  `military_updated` int(11) unsigned DEFAULT NULL,

  `closest_military_name` varchar(300) DEFAULT NULL,
  `closest_military_distance` varchar(300) DEFAULT NULL,
  `closest_military_tags` varchar(300) DEFAULT NULL,
  `closest_military_items` json DEFAULT NULL,

  `military_1km` json DEFAULT NULL,
  `military_count_1km` SMALLINT unsigned DEFAULT NULL,

  `military_5km` json DEFAULT NULL,
  `military_count_5km` SMALLINT unsigned DEFAULT NULL,

  `military_10km` json DEFAULT NULL,
  `military_count_10km` SMALLINT unsigned DEFAULT NULL,

  `military_25km` json DEFAULT NULL,
  `military_count_25km` SMALLINT unsigned DEFAULT NULL,

  `military_50km` json DEFAULT NULL,
  `military_count_50km` SMALLINT unsigned DEFAULT NULL,

  `military_100km` json DEFAULT NULL,
  `military_count_100km` SMALLINT unsigned DEFAULT NULL,

  `military_150km` json DEFAULT NULL,
  `military_count_150km` SMALLINT unsigned DEFAULT NULL,

  `military_200km` json DEFAULT NULL,
  `military_count_200km` SMALLINT unsigned DEFAULT NULL,

  -- natural metrics

  `natural_updated` int(11) unsigned DEFAULT NULL,

  `closest_natural_name` varchar(300) DEFAULT NULL,
  `closest_natural_distance` varchar(300) DEFAULT NULL,
  `closest_natural_tags` varchar(300) DEFAULT NULL,
  `closest_natural_items` json DEFAULT NULL,

  `natural_1km` json DEFAULT NULL,
  `natural_count_1km` SMALLINT unsigned DEFAULT NULL,
  `natural_density_1km` DECIMAL(8,7) DEFAULT NULL,

  `natural_5km` json DEFAULT NULL,
  `natural_count_5km` SMALLINT unsigned DEFAULT NULL,
  `natural_density_5km` DECIMAL(8,7) DEFAULT NULL,

  `natural_10km` json DEFAULT NULL,
  `natural_count_10km` SMALLINT unsigned DEFAULT NULL,
  `natural_density_10km` DECIMAL(8,7) DEFAULT NULL,

  `natural_25km` json DEFAULT NULL,
  `natural_count_25km` SMALLINT unsigned DEFAULT NULL,
  `natural_density_25km` DECIMAL(8,7) DEFAULT NULL,

  -- pollution metrics

  `pollution_updated` int(11) unsigned DEFAULT NULL,

  `closest_pollution_name` varchar(300) DEFAULT NULL,
  `closest_pollution_distance` varchar(300) DEFAULT NULL,
  `closest_pollution_tags` varchar(300) DEFAULT NULL,
  `closest_pollution_items` json DEFAULT NULL,

  `pollution_1km` json DEFAULT NULL,
  `pollution_count_1km` SMALLINT unsigned DEFAULT NULL,
  `pollution_density_1km` DECIMAL(8,7) DEFAULT NULL,

  `pollution_5km` json DEFAULT NULL,
  `pollution_count_5km` SMALLINT unsigned DEFAULT NULL,
  `pollution_density_5km` DECIMAL(8,7) DEFAULT NULL,

  `pollution_10km` json DEFAULT NULL,
  `pollution_count_10km` SMALLINT unsigned DEFAULT NULL,
  `pollution_density_10km` DECIMAL(8,7) DEFAULT NULL,

  `pollution_25km` json DEFAULT NULL,
  `pollution_count_25km` SMALLINT unsigned DEFAULT NULL,
  `pollution_density_25km` DECIMAL(8,7) DEFAULT NULL,

  -- public_land metrics

  `public_land_updated` int(11) unsigned DEFAULT NULL,

  `closest_public_land_name` varchar(300) DEFAULT NULL,
  `closest_public_land_distance` varchar(300) DEFAULT NULL,
  `closest_public_land_tags` varchar(300) DEFAULT NULL,
  `closest_public_land_items` json DEFAULT NULL,

  `public_land_1km` json DEFAULT NULL,
  `public_land_count_1km` SMALLINT unsigned DEFAULT NULL,
  `public_land_density_1km` DECIMAL(8,7) DEFAULT NULL,

  `public_land_5km` json DEFAULT NULL,
  `public_land_count_5km` SMALLINT unsigned DEFAULT NULL,
  `public_land_density_5km` DECIMAL(8,7) DEFAULT NULL,

  `public_land_10km` json DEFAULT NULL,
  `public_land_count_10km` SMALLINT unsigned DEFAULT NULL,
  `public_land_density_10km` DECIMAL(8,7) DEFAULT NULL,

  `public_land_25km` json DEFAULT NULL,
  `public_land_count_25km` SMALLINT unsigned DEFAULT NULL,
  `public_land_density_25km` DECIMAL(8,7) DEFAULT NULL,

  -- religious metrics

  `religious_updated` int(11) unsigned DEFAULT NULL,

  `closest_religious_name` varchar(300) DEFAULT NULL,
  `closest_religious_distance` varchar(300) DEFAULT NULL,
  `closest_religious_tags` varchar(300) DEFAULT NULL,
  `closest_religious_items` json DEFAULT NULL,

  `religion_1km` json DEFAULT NULL,
  `religion_count_1km` SMALLINT unsigned DEFAULT NULL,
  `religion_density_1km` DECIMAL(8,7) DEFAULT NULL,

  `religion_5km` json DEFAULT NULL,
  `religion_count_5km` SMALLINT unsigned DEFAULT NULL,
  `religion_density_5km` DECIMAL(8,7) DEFAULT NULL,

  `religion_10km` json DEFAULT NULL,
  `religion_count_10km` SMALLINT unsigned DEFAULT NULL,
  `religion_density_10km` DECIMAL(8,7) DEFAULT NULL,

  `religion_25km` json DEFAULT NULL,
  `religion_count_25km` SMALLINT unsigned DEFAULT NULL,
  `religion_density_25km` DECIMAL(8,7) DEFAULT NULL,

  `religion_50km` json DEFAULT NULL,
  `religion_count_50km` SMALLINT unsigned DEFAULT NULL,
  `religion_density_50km` DECIMAL(8,7) DEFAULT NULL,

  `religion_100km` json DEFAULT NULL,
  `religion_count_100km` SMALLINT unsigned DEFAULT NULL,
  `religion_density_100km` DECIMAL(8,7) DEFAULT NULL,

  `religion_150km` json DEFAULT NULL,
  `religion_count_150km` SMALLINT unsigned DEFAULT NULL,
  `religion_density_150km` DECIMAL(8,7) DEFAULT NULL,

  -- spring metrics

  `spring_updated` int(11) unsigned DEFAULT NULL,

  `closest_spring_name` varchar(300) DEFAULT NULL,
  `closest_spring_distance` varchar(300) DEFAULT NULL,
  `closest_spring_tags` varchar(300) DEFAULT NULL,
  `closest_spring_items` json DEFAULT NULL,

  `spring_1km` json DEFAULT NULL,
  `spring_count_1km` SMALLINT unsigned DEFAULT NULL,

  `spring_5km` json DEFAULT NULL,
  `spring_count_5km` SMALLINT unsigned DEFAULT NULL,

  `spring_10km` json DEFAULT NULL,
  `spring_count_10km` SMALLINT unsigned DEFAULT NULL,

  `spring_25km` json DEFAULT NULL,
  `spring_count_25km` SMALLINT unsigned DEFAULT NULL,

  `spring_50km` json DEFAULT NULL,
  `spring_count_50km` SMALLINT unsigned DEFAULT NULL,

  `spring_100km` json DEFAULT NULL,
  `spring_count_100km` SMALLINT unsigned DEFAULT NULL,

  -- water metrics

  `water_updated` int(11) unsigned DEFAULT NULL,

  `closest_water_name` varchar(300) DEFAULT NULL,
  `closest_water_distance` varchar(300) DEFAULT NULL,
  `closest_water_tags` varchar(300) DEFAULT NULL,
  `closest_water_items` json DEFAULT NULL,

  `water_1km` json DEFAULT NULL,
  `water_count_1km` SMALLINT unsigned DEFAULT NULL,
  `water_density_1km` DECIMAL(8,7) DEFAULT NULL,

  `water_5km` json DEFAULT NULL,
  `water_count_5km` SMALLINT unsigned DEFAULT NULL,
  `water_density_5km` DECIMAL(8,7) DEFAULT NULL,

  `water_10km` json DEFAULT NULL,
  `water_count_10km` SMALLINT unsigned DEFAULT NULL,
  `water_density_10km` DECIMAL(8,7) DEFAULT NULL,

  `water_25km` json DEFAULT NULL,
  `water_count_25km` SMALLINT unsigned DEFAULT NULL,
  `water_density_25km` DECIMAL(8,7) DEFAULT NULL,

  `water_50km` json DEFAULT NULL,
  `water_count_50km` SMALLINT unsigned DEFAULT NULL,
  `water_density_50km` DECIMAL(8,7) DEFAULT NULL,

  UNIQUE (`path`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `parcels_nature`;

CREATE TABLE `parcels_nature` (
  `path` varchar(300) NOT NULL,
  `nature_score` decimal(5,2) DEFAULT NULL,
  `leaf_rating` tinyint unsigned DEFAULT NULL,
  UNIQUE (`path`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
