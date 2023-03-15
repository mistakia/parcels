--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2 (Ubuntu 15.2-1.pgdg22.04+1)
-- Dumped by pg_dump version 15.2 (Ubuntu 15.2-1.pgdg22.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: parcels_production; Type: SCHEMA; Schema: -; Owner: pgloader_pg
--

CREATE SCHEMA parcels_production;


ALTER SCHEMA parcels_production OWNER TO pgloader_pg;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: airports; Type: TABLE; Schema: parcels_production; Owner: pgloader_pg
--

CREATE TABLE parcels_production.airports (
    latitude numeric(8,6),
    longitude numeric(9,6),
    type character varying(100),
    name character varying(200),
    abbrev character varying(10),
    gps_code character varying(10),
    iata_code character varying(10),
    wikipedia character varying(300)
);


ALTER TABLE parcels_production.airports OWNER TO pgloader_pg;

--
-- Name: COLUMN airports.latitude; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.airports.latitude IS 'latitude decimal coordinate';


--
-- Name: COLUMN airports.longitude; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.airports.longitude IS 'longitude decimal coordinate';


--
-- Name: broadband_availability; Type: TABLE; Schema: parcels_production; Owner: pgloader_pg
--

CREATE TABLE parcels_production.broadband_availability (
    frn integer NOT NULL,
    provider_id integer NOT NULL,
    brand_name character varying(200) NOT NULL,
    location_id character varying(200) NOT NULL,
    technology smallint NOT NULL,
    max_advertised_download_speed integer NOT NULL,
    max_advertised_upload_speed integer NOT NULL,
    low_latency boolean NOT NULL,
    business_residential_code character varying(1) NOT NULL,
    state_usps character varying(2) NOT NULL,
    block_geoid character varying(15) NOT NULL,
    h3_res8_id character varying(16) NOT NULL
);


ALTER TABLE parcels_production.broadband_availability OWNER TO pgloader_pg;

--
-- Name: coordinates; Type: TABLE; Schema: parcels_production; Owner: pgloader_pg
--

CREATE TABLE parcels_production.coordinates (
    lat numeric(8,6),
    lon numeric(9,6),
    elevation text
);


ALTER TABLE parcels_production.coordinates OWNER TO pgloader_pg;

--
-- Name: COLUMN coordinates.lat; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.coordinates.lat IS 'latitude decimal coordinate';


--
-- Name: COLUMN coordinates.lon; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.coordinates.lon IS 'longitude decimal coordinate';


--
-- Name: COLUMN coordinates.elevation; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.coordinates.elevation IS 'Estimated 90 meter digital elevation model is used';


--
-- Name: coverage; Type: TABLE; Schema: parcels_production; Owner: pgloader_pg
--

CREATE TABLE parcels_production.coverage (
    column_name character varying(40) NOT NULL,
    table_name character varying(30) NOT NULL,
    total_rows bigint NOT NULL,
    covered_rows bigint NOT NULL,
    coverage_percentage numeric(5,2) NOT NULL,
    coverage_updated bigint NOT NULL,
    column_updated timestamp with time zone
);


ALTER TABLE parcels_production.coverage OWNER TO pgloader_pg;

--
-- Name: importers; Type: TABLE; Schema: parcels_production; Owner: pgloader_pg
--

CREATE TABLE parcels_production.importers (
    name character varying(20) NOT NULL,
    running character varying(100),
    last_error text,
    "timestamp" integer,
    data json
);


ALTER TABLE parcels_production.importers OWNER TO pgloader_pg;

--
-- Name: parcels; Type: TABLE; Schema: parcels_production; Owner: pgloader_pg
--

CREATE TABLE parcels_production.parcels (
    ogc_fid bigint NOT NULL,
    geoid text,
    sourceagent text,
    parcelnumb text,
    usecode text,
    usedesc text,
    zoning text,
    zoning_description text,
    struct boolean,
    multistruct boolean,
    structno integer,
    yearbuilt integer,
    numstories double precision,
    numunits integer,
    structstyle text,
    parvaltype text,
    improvval double precision,
    landval double precision,
    parval double precision,
    agval double precision,
    saleprice double precision,
    saledate date,
    taxamt double precision,
    taxyear text,
    owntype text,
    owner text,
    owner_index character varying(200),
    ownfrst text,
    ownlast text,
    owner2 text,
    owner3 text,
    owner4 text,
    subsurfown text,
    subowntype text,
    mailadd text,
    mail_address2 text,
    careof text,
    mail_addno text,
    mail_addpref text,
    mail_addstr text,
    mail_addsttyp text,
    mail_addstsuf text,
    mail_unit text,
    mail_city text,
    mail_state2 text,
    mail_zip text,
    mail_country text,
    mail_urbanization text,
    address text,
    address2 text,
    saddno text,
    saddpref text,
    saddstr text,
    saddsttyp text,
    saddstsuf text,
    sunit text,
    scity text,
    original_address text,
    city text,
    county text,
    state2 text,
    szip text,
    urbanization text,
    location_name text,
    address_source text,
    legaldesc text,
    plat text,
    book text,
    page text,
    block text,
    lot text,
    neighborhood text,
    subdivision text,
    lat text,
    lon text,
    goz text,
    goz_tract text,
    census_tract text,
    census_block text,
    census_blockgroup text,
    sourceref text,
    sourcedate date,
    sourceurl text,
    recrdareatx text,
    recrdareano double precision,
    gisacre double precision,
    sqft double precision,
    ll_gisacre double precision,
    ll_gissqft bigint,
    ll_bldg_footprint_sqft integer,
    ll_bldg_count integer,
    cdl_raw text,
    cdl_majority_category text,
    cdl_majority_percent double precision,
    cdl_date text,
    revisedate date,
    path character varying(200),
    ll_stable_id text,
    ll_uuid character varying(36) NOT NULL,
    ll_updated_at timestamp with time zone,
    dpv_status text,
    dpv_codes text,
    dpv_notes text,
    dpv_type text,
    cass_errorno text,
    rdi text,
    usps_vacancy text,
    usps_vacancy_date date,
    lbcs_activity numeric(10,0),
    lbcs_activity_desc text,
    lbcs_function numeric(10,0),
    lbcs_function_desc text,
    lbcs_structure numeric(10,0),
    lbcs_structure_desc text,
    lbcs_site numeric(10,0),
    lbcs_site_desc text,
    lbcs_ownership numeric(10,0),
    lbcs_ownership_desc text,
    padus_public_access text,
    homestead_exemption text,
    reviseddate date,
    jurscode text,
    acctid_county_stripped text,
    geogcode text,
    ooi text,
    resityp text,
    addrtyp text,
    namekey text,
    dr1clerk text,
    towncode text,
    desctown text,
    subdivision_code text,
    detailed_subdivision_code text,
    dr1liber text,
    dr1folio text,
    section text,
    map text,
    grid text,
    zoning_change_date date,
    rzrealdat date,
    ciuse text,
    descciuse text,
    exclass text,
    descexcl text,
    luom text,
    width double precision,
    depth double precision,
    pfuw text,
    pfus text,
    pflw text,
    pfsp text,
    pfsu text,
    pfic text,
    pfih text,
    recind text,
    permittyp text,
    strugrad text,
    descgrad text,
    strucnst text,
    desccnst text,
    strustyl text,
    strubldg text,
    descbldg text,
    lastinsp date,
    lastassd date,
    assessor text,
    transno1 text,
    grntnam1 text,
    gr1clrk1v text,
    gr1libr1 text,
    gr1folo1 text,
    convey1 text,
    mortgag1 text,
    crtarcod text,
    fcmacode text,
    agfndarea double precision,
    agfndluom text,
    entzndat date,
    entznassm double precision,
    plndevdat date,
    nprctstdat date,
    nprcarea double precision,
    nprcluom text,
    homqlcod text,
    homqldat date,
    resident double precision,
    resi2010 double precision,
    resi2000 double precision,
    resi1990 double precision,
    resiuths double precision,
    aprtment double precision,
    trailer double precision,
    special double precision,
    other double precision,
    ptype text,
    sdatwebadr text,
    polyid text,
    qoz text,
    qoz_tract text
);


ALTER TABLE parcels_production.parcels OWNER TO pgloader_pg;

--
-- Name: COLUMN parcels.ogc_fid; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.ogc_fid IS 'object id';


--
-- Name: COLUMN parcels.geoid; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.geoid IS 'FIPS code';


--
-- Name: COLUMN parcels.sourceagent; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.sourceagent IS 'Source Agent';


--
-- Name: COLUMN parcels.parcelnumb; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.parcelnumb IS 'Parcel ID';


--
-- Name: COLUMN parcels.usecode; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.usecode IS 'Parcel Use Code';


--
-- Name: COLUMN parcels.usedesc; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.usedesc IS 'Parcel Use Description';


--
-- Name: COLUMN parcels.zoning; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.zoning IS 'Zoning Code';


--
-- Name: COLUMN parcels.zoning_description; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.zoning_description IS 'Zoning description';


--
-- Name: COLUMN parcels.struct; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.struct IS 'Structure on Parcel';


--
-- Name: COLUMN parcels.multistruct; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.multistruct IS 'Multiple structures on Parcel';


--
-- Name: COLUMN parcels.structno; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.structno IS 'Number of structures on parcel';


--
-- Name: COLUMN parcels.yearbuilt; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.yearbuilt IS 'Structure Year Built';


--
-- Name: COLUMN parcels.numstories; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.numstories IS 'Number of Stories';


--
-- Name: COLUMN parcels.numunits; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.numunits IS 'Number of Units';


--
-- Name: COLUMN parcels.structstyle; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.structstyle IS 'Structure Style';


--
-- Name: COLUMN parcels.parvaltype; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.parvaltype IS 'Parcel Value Type';


--
-- Name: COLUMN parcels.improvval; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.improvval IS 'Improvement Value';


--
-- Name: COLUMN parcels.landval; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.landval IS 'Land Value';


--
-- Name: COLUMN parcels.parval; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.parval IS 'Total Parcel Value';


--
-- Name: COLUMN parcels.agval; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.agval IS 'Agricultural Value';


--
-- Name: COLUMN parcels.saleprice; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.saleprice IS 'Last sale price';


--
-- Name: COLUMN parcels.saledate; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.saledate IS 'Last sale date';


--
-- Name: COLUMN parcels.taxamt; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.taxamt IS 'Annual Tax Bill';


--
-- Name: COLUMN parcels.taxyear; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.taxyear IS 'A county provided attribute indicating the tax year the assessor data applies to';


--
-- Name: COLUMN parcels.owntype; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.owntype IS 'Owner Type';


--
-- Name: COLUMN parcels.owner; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.owner IS 'Owner Name';


--
-- Name: COLUMN parcels.ownfrst; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.ownfrst IS 'Owner First Name';


--
-- Name: COLUMN parcels.ownlast; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.ownlast IS 'Owner Last Name';


--
-- Name: COLUMN parcels.owner2; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.owner2 IS 'Second Owner Name';


--
-- Name: COLUMN parcels.owner3; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.owner3 IS 'Third Owner Name';


--
-- Name: COLUMN parcels.owner4; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.owner4 IS 'Fourth Owner Name';


--
-- Name: COLUMN parcels.subsurfown; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.subsurfown IS 'Subsurface Owner';


--
-- Name: COLUMN parcels.subowntype; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.subowntype IS 'Subsurface Owner Type';


--
-- Name: COLUMN parcels.mailadd; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.mailadd IS 'Mailing Address';


--
-- Name: COLUMN parcels.mail_address2; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.mail_address2 IS 'Mailing Address Second Line';


--
-- Name: COLUMN parcels.careof; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.careof IS 'Mailing Address Care of';


--
-- Name: COLUMN parcels.mail_addno; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.mail_addno IS 'Mailing Address Street Number';


--
-- Name: COLUMN parcels.mail_addpref; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.mail_addpref IS 'Mailing Address Street Prefix';


--
-- Name: COLUMN parcels.mail_addstr; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.mail_addstr IS 'Mailing Address Street Name';


--
-- Name: COLUMN parcels.mail_addsttyp; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.mail_addsttyp IS 'Mailing Address Street Type';


--
-- Name: COLUMN parcels.mail_addstsuf; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.mail_addstsuf IS 'Mailing Address Street Suffix';


--
-- Name: COLUMN parcels.mail_unit; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.mail_unit IS 'Mailing Address Unit Number';


--
-- Name: COLUMN parcels.mail_city; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.mail_city IS 'Mailing Address City';


--
-- Name: COLUMN parcels.mail_state2; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.mail_state2 IS 'Mailing Address State';


--
-- Name: COLUMN parcels.mail_zip; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.mail_zip IS 'Mailing Address ZIP Code';


--
-- Name: COLUMN parcels.mail_country; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.mail_country IS 'Mailing Address Country';


--
-- Name: COLUMN parcels.mail_urbanization; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.mail_urbanization IS 'Mailing Address Urbanizacion (Puerto Rico)';


--
-- Name: COLUMN parcels.address; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.address IS 'Parcel Address';


--
-- Name: COLUMN parcels.address2; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.address2 IS 'Parcel Address Second Line';


--
-- Name: COLUMN parcels.saddno; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.saddno IS 'Parcel Address Number';


--
-- Name: COLUMN parcels.saddpref; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.saddpref IS 'Parcel Address Prefix';


--
-- Name: COLUMN parcels.saddstr; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.saddstr IS 'Parcel Address Street Name';


--
-- Name: COLUMN parcels.saddsttyp; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.saddsttyp IS 'Parcel Address Street Type';


--
-- Name: COLUMN parcels.saddstsuf; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.saddstsuf IS 'Parcel Address Street Suffix';


--
-- Name: COLUMN parcels.sunit; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.sunit IS 'Parcel Address Unit';


--
-- Name: COLUMN parcels.scity; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.scity IS 'Parcel Address City';


--
-- Name: COLUMN parcels.original_address; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.original_address IS 'Address fields as originally provided by the county, separated by a semicolon and a space';


--
-- Name: COLUMN parcels.city; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.city IS 'US Census County Subdivision';


--
-- Name: COLUMN parcels.county; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.county IS 'Parcel Address County';


--
-- Name: COLUMN parcels.state2; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.state2 IS 'Parcel Address State';


--
-- Name: COLUMN parcels.szip; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.szip IS 'Parcel Address Zip Code';


--
-- Name: COLUMN parcels.urbanization; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.urbanization IS 'A postal address field commonly used in Puerto Rico';


--
-- Name: COLUMN parcels.location_name; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.location_name IS 'Location Name';


--
-- Name: COLUMN parcels.address_source; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.address_source IS 'Primary Address Source';


--
-- Name: COLUMN parcels.legaldesc; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.legaldesc IS 'Legal Description';


--
-- Name: COLUMN parcels.plat; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.plat IS 'Plat number the parcel is recorded on';


--
-- Name: COLUMN parcels.book; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.book IS 'Book/Liber the parcel is recorded in';


--
-- Name: COLUMN parcels.page; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.page IS 'Page/Folio the parcel is recorded on';


--
-- Name: COLUMN parcels.block; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.block IS 'Block';


--
-- Name: COLUMN parcels.lot; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.lot IS 'Lot';


--
-- Name: COLUMN parcels.neighborhood; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.neighborhood IS 'Neighborhood';


--
-- Name: COLUMN parcels.subdivision; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.subdivision IS 'Subdivision';


--
-- Name: COLUMN parcels.lat; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.lat IS 'On parcel centroid latitude decimal coordinate';


--
-- Name: COLUMN parcels.lon; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.lon IS 'On parcel centroid longitude decimal coordinate';


--
-- Name: COLUMN parcels.goz; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.goz IS 'Federal Qualified Opportunity Zone';


--
-- Name: COLUMN parcels.goz_tract; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.goz_tract IS 'Qualified Opportunity Zone Tract Number';


--
-- Name: COLUMN parcels.census_tract; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.census_tract IS 'Census 2010 Tract';


--
-- Name: COLUMN parcels.census_block; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.census_block IS 'Census 2010 Block';


--
-- Name: COLUMN parcels.census_blockgroup; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.census_blockgroup IS 'Census 2010 Blockgroup';


--
-- Name: COLUMN parcels.sourceref; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.sourceref IS 'A county provided reference for the parcel record';


--
-- Name: COLUMN parcels.sourcedate; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.sourcedate IS 'A county provided date for the parcel record';


--
-- Name: COLUMN parcels.sourceurl; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.sourceurl IS 'A county provided url to the county parcel record online';


--
-- Name: COLUMN parcels.recrdareatx; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.recrdareatx IS 'Recorded Area (text)';


--
-- Name: COLUMN parcels.recrdareano; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.recrdareano IS 'Recorded Area (number)';


--
-- Name: COLUMN parcels.gisacre; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.gisacre IS 'County-provided Acres';


--
-- Name: COLUMN parcels.sqft; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.sqft IS 'County-provided Parcel Square Feet';


--
-- Name: COLUMN parcels.ll_gisacre; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.ll_gisacre IS 'Loveland calculated parcel areas';


--
-- Name: COLUMN parcels.ll_gissqft; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.ll_gissqft IS 'Loveland calculated parcel square feet';


--
-- Name: COLUMN parcels.ll_bldg_footprint_sqft; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.ll_bldg_footprint_sqft IS 'Loveland calculated building footprint square feet';


--
-- Name: COLUMN parcels.ll_bldg_count; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.ll_bldg_count IS 'Total number of buildings on the parcel, calculated by loveland';


--
-- Name: COLUMN parcels.cdl_raw; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.cdl_raw IS 'Cropland Data Layer raw values';


--
-- Name: COLUMN parcels.cdl_majority_category; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.cdl_majority_category IS 'This is the human readable Category name for the land cover type that is most common on the parcel';


--
-- Name: COLUMN parcels.cdl_majority_percent; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.cdl_majority_percent IS 'This is the actual percentage of pixels for the majority category';


--
-- Name: COLUMN parcels.cdl_date; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.cdl_date IS 'The year of the Cropland Data Layer data set the current attributes are derived from';


--
-- Name: COLUMN parcels.revisedate; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.revisedate IS 'The last date of last revision as provided by the county assessors office if available';


--
-- Name: COLUMN parcels.path; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.path IS 'Lovelands human-readable identifier for this parcel. Not guaranteed to be stable between updates';


--
-- Name: COLUMN parcels.ll_stable_id; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.ll_stable_id IS 'Stable ID Status';


--
-- Name: COLUMN parcels.ll_uuid; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.ll_uuid IS 'Uniquely identifies a single parcel with a v4 uuid. A stable parcel id across county data refreshes. This field should be used for tracking indiviual parcels.';


--
-- Name: COLUMN parcels.ll_updated_at; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.ll_updated_at IS 'Timestamp of last update of any kind to this row, internal changes to row, and/or county updates';


--
-- Name: COLUMN parcels.dpv_status; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.dpv_status IS 'USPS Delivary Point Validation';


--
-- Name: COLUMN parcels.dpv_codes; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.dpv_codes IS 'Delivery Point Validation Codes';


--
-- Name: COLUMN parcels.dpv_notes; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.dpv_notes IS 'Delivery Point Validation Notes';


--
-- Name: COLUMN parcels.dpv_type; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.dpv_type IS 'Delivery Point Match Type';


--
-- Name: COLUMN parcels.cass_errorno; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.cass_errorno IS 'CASS Error Codes';


--
-- Name: COLUMN parcels.rdi; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.rdi IS 'Residential Delivary Indicator';


--
-- Name: COLUMN parcels.usps_vacancy; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.usps_vacancy IS 'USPS Vacancy Indicator';


--
-- Name: COLUMN parcels.usps_vacancy_date; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.usps_vacancy_date IS 'USPS Vacancy Indicator Date';


--
-- Name: COLUMN parcels.lbcs_activity; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.lbcs_activity IS 'Land Use Code: Activity';


--
-- Name: COLUMN parcels.lbcs_activity_desc; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.lbcs_activity_desc IS 'Land Use Code Description: Activity';


--
-- Name: COLUMN parcels.lbcs_function; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.lbcs_function IS 'Land Use Code: Function';


--
-- Name: COLUMN parcels.lbcs_function_desc; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.lbcs_function_desc IS 'Land Use Code Description: Function';


--
-- Name: COLUMN parcels.lbcs_structure; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.lbcs_structure IS 'Land Use Code: Structure';


--
-- Name: COLUMN parcels.lbcs_structure_desc; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.lbcs_structure_desc IS 'Land Use Code Description: Structure';


--
-- Name: COLUMN parcels.lbcs_site; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.lbcs_site IS 'Land Use Code: Site';


--
-- Name: COLUMN parcels.lbcs_site_desc; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.lbcs_site_desc IS 'Land Use Code Description: Site';


--
-- Name: COLUMN parcels.lbcs_ownership; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.lbcs_ownership IS 'Land Use Code: Ownership';


--
-- Name: COLUMN parcels.lbcs_ownership_desc; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.lbcs_ownership_desc IS 'Land Use Code Description: Ownership';


--
-- Name: COLUMN parcels.padus_public_access; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.padus_public_access IS 'PAD-US Public Access Designation';


--
-- Name: COLUMN parcels.homestead_exemption; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.homestead_exemption IS 'Homestead Exemption';


--
-- Name: COLUMN parcels.reviseddate; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.reviseddate IS 'Date of Last Revision';


--
-- Name: COLUMN parcels.jurscode; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.jurscode IS 'Jurisdiction Code';


--
-- Name: COLUMN parcels.acctid_county_stripped; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.acctid_county_stripped IS 'Account ID Without County Prefix';


--
-- Name: COLUMN parcels.geogcode; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.geogcode IS 'Geographic Code';


--
-- Name: COLUMN parcels.ooi; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.ooi IS 'Owner Occupied Indicator';


--
-- Name: COLUMN parcels.resityp; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.resityp IS 'Residential Address Type Code';


--
-- Name: COLUMN parcels.addrtyp; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.addrtyp IS 'Address Source Indicator';


--
-- Name: COLUMN parcels.namekey; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.namekey IS 'Owner Name Key';


--
-- Name: COLUMN parcels.dr1clerk; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.dr1clerk IS 'Deed Clerk';


--
-- Name: COLUMN parcels.towncode; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.towncode IS 'Town Code';


--
-- Name: COLUMN parcels.desctown; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.desctown IS 'Town Code Description';


--
-- Name: COLUMN parcels.subdivision_code; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.subdivision_code IS 'Subdivision Code';


--
-- Name: COLUMN parcels.detailed_subdivision_code; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.detailed_subdivision_code IS 'Detailed Subdivision Code';


--
-- Name: COLUMN parcels.dr1liber; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.dr1liber IS 'Deed Liber';


--
-- Name: COLUMN parcels.dr1folio; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.dr1folio IS 'Deed Folio';


--
-- Name: COLUMN parcels.section; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.section IS 'Section';


--
-- Name: COLUMN parcels.map; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.map IS 'Map';


--
-- Name: COLUMN parcels.grid; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.grid IS 'Grid';


--
-- Name: COLUMN parcels.zoning_change_date; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.zoning_change_date IS 'Zoning Change Date';


--
-- Name: COLUMN parcels.rzrealdat; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.rzrealdat IS 'Rezoned Reality Date';


--
-- Name: COLUMN parcels.ciuse; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.ciuse IS 'Commercial and Industrial Property Use Code';


--
-- Name: COLUMN parcels.descciuse; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.descciuse IS 'Commercial and Industrial Property Description';


--
-- Name: COLUMN parcels.exclass; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.exclass IS 'Exemption Class Code';


--
-- Name: COLUMN parcels.descexcl; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.descexcl IS 'Exemption Class Description';


--
-- Name: COLUMN parcels.luom; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.luom IS 'Land Area Unit';


--
-- Name: COLUMN parcels.width; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.width IS 'Width';


--
-- Name: COLUMN parcels.depth; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.depth IS 'Depth';


--
-- Name: COLUMN parcels.pfuw; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.pfuw IS 'Public Water';


--
-- Name: COLUMN parcels.pfus; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.pfus IS 'Public Sewer';


--
-- Name: COLUMN parcels.pflw; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.pflw IS 'Waterfront';


--
-- Name: COLUMN parcels.pfsp; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.pfsp IS 'Street Paved';


--
-- Name: COLUMN parcels.pfsu; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.pfsu IS 'Street Unpaved';


--
-- Name: COLUMN parcels.pfic; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.pfic IS 'Property Factor Influece - Commerical Indicator';


--
-- Name: COLUMN parcels.pfih; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.pfih IS 'Property Factor Influence - Historical';


--
-- Name: COLUMN parcels.recind; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.recind IS 'Recreation Influence Indicator';


--
-- Name: COLUMN parcels.permittyp; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.permittyp IS 'Permit Type';


--
-- Name: COLUMN parcels.strugrad; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.strugrad IS 'Construction Grade Code';


--
-- Name: COLUMN parcels.descgrad; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.descgrad IS 'Construction Grade Description';


--
-- Name: COLUMN parcels.strucnst; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.strucnst IS 'Construction Code';


--
-- Name: COLUMN parcels.desccnst; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.desccnst IS 'Construction Description';


--
-- Name: COLUMN parcels.strustyl; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.strustyl IS 'Building Style Code';


--
-- Name: COLUMN parcels.strubldg; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.strubldg IS 'Building Type code';


--
-- Name: COLUMN parcels.descbldg; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.descbldg IS 'Building Type Description';


--
-- Name: COLUMN parcels.lastinsp; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.lastinsp IS 'Last Date Inspected';


--
-- Name: COLUMN parcels.lastassd; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.lastassd IS 'Last Date Assessed';


--
-- Name: COLUMN parcels.assessor; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.assessor IS 'Assessor Numeric Code';


--
-- Name: COLUMN parcels.transno1; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.transno1 IS 'Sale Transfer Number';


--
-- Name: COLUMN parcels.grntnam1; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.grntnam1 IS 'Sale Grantor Name';


--
-- Name: COLUMN parcels.gr1clrk1v; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.gr1clrk1v IS 'Grantor Deed Clerk';


--
-- Name: COLUMN parcels.gr1libr1; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.gr1libr1 IS 'Grantor Liber';


--
-- Name: COLUMN parcels.gr1folo1; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.gr1folo1 IS 'Grantor Folio';


--
-- Name: COLUMN parcels.convey1; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.convey1 IS 'How Conveyed';


--
-- Name: COLUMN parcels.mortgag1; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.mortgag1 IS 'Mortgage';


--
-- Name: COLUMN parcels.crtarcod; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.crtarcod IS 'Critical Area Code';


--
-- Name: COLUMN parcels.fcmacode; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.fcmacode IS 'Forest Conservation Management Agreement Code';


--
-- Name: COLUMN parcels.agfndarea; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.agfndarea IS 'Agricultural Preservation Foundation Area';


--
-- Name: COLUMN parcels.agfndluom; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.agfndluom IS 'Agricultural Preservation Area Unit';


--
-- Name: COLUMN parcels.entzndat; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.entzndat IS 'Enterprise Zone Date';


--
-- Name: COLUMN parcels.entznassm; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.entznassm IS 'Enterprise Zone Assessment';


--
-- Name: COLUMN parcels.plndevdat; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.plndevdat IS 'PUD date';


--
-- Name: COLUMN parcels.nprctstdat; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.nprctstdat IS 'Perc Test Date';


--
-- Name: COLUMN parcels.nprcarea; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.nprcarea IS 'Perc Test Area';


--
-- Name: COLUMN parcels.nprcluom; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.nprcluom IS 'Perc Test Area Unit';


--
-- Name: COLUMN parcels.homqlcod; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.homqlcod IS 'Homestead Tax Credit Application';


--
-- Name: COLUMN parcels.homqldat; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.homqldat IS 'Homestead Tax Credit Date';


--
-- Name: COLUMN parcels.resident; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.resident IS 'Resident';


--
-- Name: COLUMN parcels.resi2010; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.resi2010 IS 'Resident Property 2010';


--
-- Name: COLUMN parcels.resi2000; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.resi2000 IS 'Resident Property 2000';


--
-- Name: COLUMN parcels.resi1990; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.resi1990 IS 'Resident Property 1990';


--
-- Name: COLUMN parcels.resiuths; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.resiuths IS 'Resident Property Low Value';


--
-- Name: COLUMN parcels.aprtment; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.aprtment IS 'Apartment Residence';


--
-- Name: COLUMN parcels.trailer; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.trailer IS 'Trailer Residence';


--
-- Name: COLUMN parcels.special; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.special IS 'Special Residence';


--
-- Name: COLUMN parcels.other; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.other IS 'Other';


--
-- Name: COLUMN parcels.ptype; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.ptype IS 'Type of Digitized Parcel';


--
-- Name: COLUMN parcels.sdatwebadr; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.sdatwebadr IS 'SDAT URL';


--
-- Name: COLUMN parcels.polyid; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.polyid IS 'Polygon ID';


--
-- Name: COLUMN parcels.qoz; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.qoz IS 'Federal Qualified Opportunity Zone';


--
-- Name: COLUMN parcels.qoz_tract; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels.qoz_tract IS 'Qualified Opportunity Zone Tract Number';


--
-- Name: parcels_agriculture; Type: TABLE; Schema: parcels_production; Owner: pgloader_pg
--

CREATE TABLE parcels_production.parcels_agriculture (
    plant_hardiness_updated bigint,
    hardiness_zone character varying(2),
    hardiness_temp smallint,
    ll_uuid character varying(36) NOT NULL
);


ALTER TABLE parcels_production.parcels_agriculture OWNER TO pgloader_pg;

--
-- Name: parcels_airport; Type: TABLE; Schema: parcels_production; Owner: pgloader_pg
--

CREATE TABLE parcels_production.parcels_airport (
    distance_km integer NOT NULL,
    abbrev character varying(10),
    ll_uuid character varying(36) NOT NULL
);


ALTER TABLE parcels_production.parcels_airport OWNER TO pgloader_pg;

--
-- Name: parcels_coastline; Type: TABLE; Schema: parcels_production; Owner: pgloader_pg
--

CREATE TABLE parcels_production.parcels_coastline (
    distance_km integer NOT NULL,
    ll_uuid character varying(36) NOT NULL
);


ALTER TABLE parcels_production.parcels_coastline OWNER TO pgloader_pg;

--
-- Name: parcels_density; Type: TABLE; Schema: parcels_production; Owner: pgloader_pg
--

CREATE TABLE parcels_production.parcels_density (
    geological_features_updated bigint,
    closest_geological_features_name character varying(300),
    closest_geological_features_distance character varying(300),
    closest_geological_features_tags character varying(300),
    closest_geological_features_items json,
    geological_features_1km json,
    geological_features_count_1km integer,
    geological_features_5km json,
    geological_features_count_5km integer,
    geological_features_10km json,
    geological_features_count_10km integer,
    geological_features_25km json,
    geological_features_count_25km integer,
    healthcare_updated bigint,
    closest_healthcare_name character varying(300),
    closest_healthcare_distance character varying(300),
    closest_healthcare_tags character varying(300),
    closest_healthcare_items json,
    healthcare_1km json,
    healthcare_count_1km integer,
    healthcare_5km json,
    healthcare_count_5km integer,
    healthcare_10km json,
    healthcare_count_10km integer,
    healthcare_25km json,
    healthcare_count_25km integer,
    healthcare_50km json,
    healthcare_count_50km integer,
    healthcare_100km json,
    healthcare_count_100km integer,
    healthcare_150km json,
    healthcare_count_150km integer,
    healthcare_200km json,
    healthcare_count_200km integer,
    library_updated bigint,
    closest_library_name character varying(300),
    closest_library_distance character varying(300),
    closest_library_tags character varying(300),
    closest_library_items json,
    library_1km json,
    library_count_1km integer,
    library_5km json,
    library_count_5km integer,
    library_10km json,
    library_count_10km integer,
    library_25km json,
    library_count_25km integer,
    library_50km json,
    library_count_50km integer,
    military_updated bigint,
    closest_military_name character varying(300),
    closest_military_distance numeric(12,2),
    closest_military_tags character varying(300),
    closest_military_items json,
    military_1km json,
    military_count_1km integer,
    military_5km json,
    military_count_5km integer,
    military_10km json,
    military_count_10km integer,
    military_25km json,
    military_count_25km integer,
    military_50km json,
    military_count_50km integer,
    military_100km json,
    military_count_100km integer,
    military_150km json,
    military_count_150km integer,
    military_200km json,
    military_count_200km integer,
    natural_updated bigint,
    closest_natural_name character varying(300),
    closest_natural_distance character varying(300),
    closest_natural_tags character varying(300),
    closest_natural_items json,
    natural_1km json,
    natural_count_1km integer,
    natural_density_1km numeric(8,7),
    natural_5km json,
    natural_count_5km integer,
    natural_density_5km numeric(8,7),
    natural_10km json,
    natural_count_10km integer,
    natural_density_10km numeric(8,7),
    natural_25km json,
    natural_count_25km integer,
    natural_density_25km numeric(8,7),
    pollution_updated bigint,
    closest_pollution_name character varying(300),
    closest_pollution_distance character varying(300),
    closest_pollution_tags character varying(300),
    closest_pollution_items json,
    pollution_1km json,
    pollution_count_1km integer,
    pollution_density_1km numeric(8,7),
    pollution_5km json,
    pollution_count_5km integer,
    pollution_density_5km numeric(8,7),
    pollution_10km json,
    pollution_count_10km integer,
    pollution_density_10km numeric(8,7),
    pollution_25km json,
    pollution_count_25km integer,
    pollution_density_25km numeric(8,7),
    public_land_updated bigint,
    closest_public_land_name character varying(300),
    closest_public_land_distance character varying(300),
    closest_public_land_tags character varying(300),
    closest_public_land_items json,
    public_land_1km json,
    public_land_count_1km integer,
    public_land_density_1km numeric(8,7),
    public_land_5km json,
    public_land_count_5km integer,
    public_land_density_5km numeric(8,7),
    public_land_10km json,
    public_land_count_10km integer,
    public_land_density_10km numeric(8,7),
    public_land_25km json,
    public_land_count_25km integer,
    public_land_density_25km numeric(8,7),
    religious_updated bigint,
    closest_religious_name character varying(300),
    closest_religious_distance character varying(300),
    closest_religious_tags character varying(300),
    closest_religious_items json,
    religion_1km json,
    religion_count_1km integer,
    religion_density_1km numeric(8,7),
    religion_5km json,
    religion_count_5km integer,
    religion_density_5km numeric(8,7),
    religion_10km json,
    religion_count_10km integer,
    religion_density_10km numeric(8,7),
    religion_25km json,
    religion_count_25km integer,
    religion_density_25km numeric(8,7),
    religion_50km json,
    religion_count_50km integer,
    religion_density_50km numeric(8,7),
    religion_100km json,
    religion_count_100km integer,
    religion_density_100km numeric(8,7),
    religion_150km json,
    religion_count_150km integer,
    religion_density_150km numeric(8,7),
    spring_updated bigint,
    closest_spring_name character varying(300),
    closest_spring_distance numeric(12,2),
    closest_spring_tags character varying(300),
    closest_spring_items json,
    spring_1km json,
    spring_count_1km integer,
    spring_5km json,
    spring_count_5km integer,
    spring_10km json,
    spring_count_10km integer,
    spring_25km json,
    spring_count_25km integer,
    spring_50km json,
    spring_count_50km integer,
    spring_100km json,
    spring_count_100km integer,
    water_updated bigint,
    closest_water_name character varying(300),
    closest_water_distance character varying(300),
    closest_water_tags character varying(300),
    closest_water_items json,
    water_1km json,
    water_count_1km integer,
    water_density_1km numeric(8,7),
    water_5km json,
    water_count_5km integer,
    water_density_5km numeric(8,7),
    water_10km json,
    water_count_10km integer,
    water_density_10km numeric(8,7),
    water_25km json,
    water_count_25km integer,
    water_density_25km numeric(8,7),
    water_50km json,
    water_count_50km integer,
    water_density_50km numeric(8,7),
    ll_uuid character varying(36) NOT NULL
);


ALTER TABLE parcels_production.parcels_density OWNER TO pgloader_pg;

--
-- Name: parcels_elevation; Type: TABLE; Schema: parcels_production; Owner: pgloader_pg
--

CREATE TABLE parcels_production.parcels_elevation (
    min integer NOT NULL,
    p10 integer NOT NULL,
    p25 integer NOT NULL,
    p50 integer NOT NULL,
    p75 integer NOT NULL,
    p90 integer NOT NULL,
    max integer NOT NULL,
    median integer NOT NULL,
    ll_uuid character varying(36) NOT NULL
);


ALTER TABLE parcels_production.parcels_elevation OWNER TO pgloader_pg;

--
-- Name: parcels_geometry; Type: TABLE; Schema: parcels_production; Owner: pgloader_pg
--

CREATE TABLE parcels_production.parcels_geometry (
    coordinates json NOT NULL,
    ll_uuid character varying(36) NOT NULL
);


ALTER TABLE parcels_production.parcels_geometry OWNER TO pgloader_pg;

--
-- Name: parcels_geometry_extra; Type: TABLE; Schema: parcels_production; Owner: pgloader_pg
--

CREATE TABLE parcels_production.parcels_geometry_extra (
    path character varying(300) NOT NULL,
    ogc_fid bigint NOT NULL,
    owner text,
    parcelnumb text,
    address text,
    coordinates json NOT NULL
);


ALTER TABLE parcels_production.parcels_geometry_extra OWNER TO pgloader_pg;

--
-- Name: COLUMN parcels_geometry_extra.ogc_fid; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels_geometry_extra.ogc_fid IS 'object id';


--
-- Name: COLUMN parcels_geometry_extra.owner; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels_geometry_extra.owner IS 'Owner Name';


--
-- Name: COLUMN parcels_geometry_extra.parcelnumb; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels_geometry_extra.parcelnumb IS 'Parcel ID';


--
-- Name: COLUMN parcels_geometry_extra.address; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels_geometry_extra.address IS 'Parcel Address';


--
-- Name: parcels_geometry_extra_ogc_fid_seq; Type: SEQUENCE; Schema: parcels_production; Owner: pgloader_pg
--

CREATE SEQUENCE parcels_production.parcels_geometry_extra_ogc_fid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE parcels_production.parcels_geometry_extra_ogc_fid_seq OWNER TO pgloader_pg;

--
-- Name: parcels_geometry_extra_ogc_fid_seq; Type: SEQUENCE OWNED BY; Schema: parcels_production; Owner: pgloader_pg
--

ALTER SEQUENCE parcels_production.parcels_geometry_extra_ogc_fid_seq OWNED BY parcels_production.parcels_geometry_extra.ogc_fid;


--
-- Name: parcels_internet; Type: TABLE; Schema: parcels_production; Owner: pgloader_pg
--

CREATE TABLE parcels_production.parcels_internet (
    broadband_updated bigint NOT NULL,
    max_download_speed integer,
    max_upload_speed integer,
    low_latency boolean,
    closest_provider_h3_res8_id character varying(16),
    closest_provider_distance bigint,
    nearby_max_download_speed integer,
    nearby_max_upload_speed integer,
    surrounding_providers json,
    surrounding_coverage_density numeric(6,5),
    ll_uuid character varying(36) NOT NULL
);


ALTER TABLE parcels_production.parcels_internet OWNER TO pgloader_pg;

--
-- Name: parcels_meta; Type: TABLE; Schema: parcels_production; Owner: pgloader_pg
--

CREATE TABLE parcels_production.parcels_meta (
    public boolean,
    tribal boolean,
    ll_uuid character varying(36) NOT NULL
);


ALTER TABLE parcels_production.parcels_meta OWNER TO pgloader_pg;

--
-- Name: parcels_nature; Type: TABLE; Schema: parcels_production; Owner: pgloader_pg
--

CREATE TABLE parcels_production.parcels_nature (
    nature_updated integer,
    nature_score numeric(5,2),
    leaf_rating smallint,
    ll_uuid character varying(36) NOT NULL
);


ALTER TABLE parcels_production.parcels_nature OWNER TO pgloader_pg;

--
-- Name: parcels_rank; Type: TABLE; Schema: parcels_production; Owner: pgloader_pg
--

CREATE TABLE parcels_production.parcels_rank (
    hardiness_temp_rank smallint,
    max_download_speed_rank smallint,
    closest_military_distance_rank smallint,
    closest_spring_distance_rank smallint,
    military_count_25km_rank smallint,
    military_count_50km_rank smallint,
    military_count_200km_rank smallint,
    spring_count_1km_rank smallint,
    spring_count_5km_rank smallint,
    spring_count_10km_rank smallint,
    spring_count_50km_rank smallint,
    spring_count_100km_rank smallint,
    ll_uuid character varying(36) NOT NULL
);


ALTER TABLE parcels_production.parcels_rank OWNER TO pgloader_pg;

--
-- Name: parcels_road; Type: TABLE; Schema: parcels_production; Owner: pgloader_pg
--

CREATE TABLE parcels_production.parcels_road (
    road_km numeric(9,5) NOT NULL,
    paved_km numeric(9,5) NOT NULL,
    high_traffic_km numeric(9,5) NOT NULL,
    highway_km numeric(9,5) NOT NULL,
    ll_uuid character varying(36) NOT NULL
);


ALTER TABLE parcels_production.parcels_road OWNER TO pgloader_pg;

--
-- Name: parcels_viewshed; Type: TABLE; Schema: parcels_production; Owner: pgloader_pg
--

CREATE TABLE parcels_production.parcels_viewshed (
    latitude numeric(8,6),
    longitude numeric(9,6),
    viewshed_percentage numeric(5,2) NOT NULL,
    viewshed_index integer NOT NULL,
    viewshed_index_under_2km integer NOT NULL,
    viewshed_index_2km integer NOT NULL,
    viewshed_index_5km integer NOT NULL,
    viewshed_index_10km integer NOT NULL,
    viewshed_index_20km integer NOT NULL,
    viewshed_index_50km integer NOT NULL,
    viewshed_index_75km integer NOT NULL,
    viewshed_nw integer NOT NULL,
    viewshed_sw integer NOT NULL,
    viewshed_se integer NOT NULL,
    viewshed_ne integer NOT NULL,
    viewshed_n integer NOT NULL,
    viewshed_e integer NOT NULL,
    viewshed_s integer NOT NULL,
    viewshed_w integer NOT NULL,
    ll_uuid character varying(36) NOT NULL
);


ALTER TABLE parcels_production.parcels_viewshed OWNER TO pgloader_pg;

--
-- Name: COLUMN parcels_viewshed.latitude; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels_viewshed.latitude IS 'latitude decimal coordinate';


--
-- Name: COLUMN parcels_viewshed.longitude; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.parcels_viewshed.longitude IS 'longitude decimal coordinate';


--
-- Name: plant_hardiness_zones; Type: TABLE; Schema: parcels_production; Owner: pgloader_pg
--

CREATE TABLE parcels_production.plant_hardiness_zones (
    statefp character varying(2) NOT NULL,
    stusps character varying(2) NOT NULL,
    state character varying(100) NOT NULL,
    temp smallint NOT NULL,
    zone character varying(2) NOT NULL,
    coordinates json NOT NULL
);


ALTER TABLE parcels_production.plant_hardiness_zones OWNER TO pgloader_pg;

--
-- Name: properties; Type: TABLE; Schema: parcels_production; Owner: pgloader_pg
--

CREATE TABLE parcels_production.properties (
    ogc_fid bigint NOT NULL,
    name character varying(50),
    postal character varying(10),
    classes character varying(30),
    headline character varying(50),
    path character varying(100),
    sqmi numeric(20,8),
    num_parcels integer,
    num_owners integer,
    import_cursor integer
);


ALTER TABLE parcels_production.properties OWNER TO pgloader_pg;

--
-- Name: COLUMN properties.ogc_fid; Type: COMMENT; Schema: parcels_production; Owner: pgloader_pg
--

COMMENT ON COLUMN parcels_production.properties.ogc_fid IS 'object id';


--
-- Name: roads; Type: TABLE; Schema: parcels_production; Owner: pgloader_pg
--

CREATE TABLE parcels_production.roads (
    number integer,
    road_class character varying(15),
    type character varying(16),
    divided character varying(16),
    country character varying(36),
    state character varying(60),
    length numeric(9,3),
    continent character varying(16),
    "lineString" json
);


ALTER TABLE parcels_production.roads OWNER TO pgloader_pg;

--
-- Name: tiles; Type: TABLE; Schema: parcels_production; Owner: pgloader_pg
--

CREATE TABLE parcels_production.tiles (
    count smallint NOT NULL,
    z smallint NOT NULL,
    y integer NOT NULL,
    x integer NOT NULL
);


ALTER TABLE parcels_production.tiles OWNER TO pgloader_pg;

--
-- Name: parcels_geometry_extra ogc_fid; Type: DEFAULT; Schema: parcels_production; Owner: pgloader_pg
--

ALTER TABLE ONLY parcels_production.parcels_geometry_extra ALTER COLUMN ogc_fid SET DEFAULT nextval('parcels_production.parcels_geometry_extra_ogc_fid_seq'::regclass);


--
-- Name: idx_536287_abbrev; Type: INDEX; Schema: parcels_production; Owner: pgloader_pg
--

CREATE UNIQUE INDEX idx_536287_abbrev ON parcels_production.airports USING btree (abbrev);


--
-- Name: idx_536292_provider_id; Type: INDEX; Schema: parcels_production; Owner: pgloader_pg
--

CREATE UNIQUE INDEX idx_536292_provider_id ON parcels_production.broadband_availability USING btree (provider_id, technology, h3_res8_id);


--
-- Name: idx_536295_lat; Type: INDEX; Schema: parcels_production; Owner: pgloader_pg
--

CREATE UNIQUE INDEX idx_536295_lat ON parcels_production.coordinates USING btree (lat, lon);


--
-- Name: idx_536300_column_name; Type: INDEX; Schema: parcels_production; Owner: pgloader_pg
--

CREATE UNIQUE INDEX idx_536300_column_name ON parcels_production.coverage USING btree (column_name, table_name);


--
-- Name: idx_536303_name; Type: INDEX; Schema: parcels_production; Owner: pgloader_pg
--

CREATE UNIQUE INDEX idx_536303_name ON parcels_production.importers USING btree (name);


--
-- Name: idx_536308_gisacre; Type: INDEX; Schema: parcels_production; Owner: pgloader_pg
--

CREATE INDEX idx_536308_gisacre ON parcels_production.parcels USING btree (gisacre);


--
-- Name: idx_536308_ll_gisacre; Type: INDEX; Schema: parcels_production; Owner: pgloader_pg
--

CREATE INDEX idx_536308_ll_gisacre ON parcels_production.parcels USING btree (ll_gisacre);


--
-- Name: idx_536308_ll_uuid; Type: INDEX; Schema: parcels_production; Owner: pgloader_pg
--

CREATE UNIQUE INDEX idx_536308_ll_uuid ON parcels_production.parcels USING btree (ll_uuid);


--
-- Name: idx_536308_path; Type: INDEX; Schema: parcels_production; Owner: pgloader_pg
--

CREATE INDEX idx_536308_path ON parcels_production.parcels USING btree (path);


--
-- Name: idx_536313_ll_uuid; Type: INDEX; Schema: parcels_production; Owner: pgloader_pg
--

CREATE UNIQUE INDEX idx_536313_ll_uuid ON parcels_production.parcels_agriculture USING btree (ll_uuid);


--
-- Name: idx_536316_ll_uuid; Type: INDEX; Schema: parcels_production; Owner: pgloader_pg
--

CREATE UNIQUE INDEX idx_536316_ll_uuid ON parcels_production.parcels_airport USING btree (ll_uuid);


--
-- Name: idx_536319_ll_uuid; Type: INDEX; Schema: parcels_production; Owner: pgloader_pg
--

CREATE UNIQUE INDEX idx_536319_ll_uuid ON parcels_production.parcels_coastline USING btree (ll_uuid);


--
-- Name: idx_536322_ll_uuid; Type: INDEX; Schema: parcels_production; Owner: pgloader_pg
--

CREATE UNIQUE INDEX idx_536322_ll_uuid ON parcels_production.parcels_density USING btree (ll_uuid);


--
-- Name: idx_536327_ll_uuid; Type: INDEX; Schema: parcels_production; Owner: pgloader_pg
--

CREATE UNIQUE INDEX idx_536327_ll_uuid ON parcels_production.parcels_elevation USING btree (ll_uuid);


--
-- Name: idx_536330_ll_uuid; Type: INDEX; Schema: parcels_production; Owner: pgloader_pg
--

CREATE UNIQUE INDEX idx_536330_ll_uuid ON parcels_production.parcels_geometry USING btree (ll_uuid);


--
-- Name: idx_536336_ogc_fid; Type: INDEX; Schema: parcels_production; Owner: pgloader_pg
--

CREATE UNIQUE INDEX idx_536336_ogc_fid ON parcels_production.parcels_geometry_extra USING btree (ogc_fid);


--
-- Name: idx_536336_path; Type: INDEX; Schema: parcels_production; Owner: pgloader_pg
--

CREATE UNIQUE INDEX idx_536336_path ON parcels_production.parcels_geometry_extra USING btree (path);


--
-- Name: idx_536342_ll_uuid; Type: INDEX; Schema: parcels_production; Owner: pgloader_pg
--

CREATE UNIQUE INDEX idx_536342_ll_uuid ON parcels_production.parcels_internet USING btree (ll_uuid);


--
-- Name: idx_536347_ll_uuid; Type: INDEX; Schema: parcels_production; Owner: pgloader_pg
--

CREATE UNIQUE INDEX idx_536347_ll_uuid ON parcels_production.parcels_meta USING btree (ll_uuid);


--
-- Name: idx_536350_ll_uuid; Type: INDEX; Schema: parcels_production; Owner: pgloader_pg
--

CREATE UNIQUE INDEX idx_536350_ll_uuid ON parcels_production.parcels_nature USING btree (ll_uuid);


--
-- Name: idx_536353_ll_uuid; Type: INDEX; Schema: parcels_production; Owner: pgloader_pg
--

CREATE UNIQUE INDEX idx_536353_ll_uuid ON parcels_production.parcels_rank USING btree (ll_uuid);


--
-- Name: idx_536356_highway_km; Type: INDEX; Schema: parcels_production; Owner: pgloader_pg
--

CREATE INDEX idx_536356_highway_km ON parcels_production.parcels_road USING btree (highway_km);


--
-- Name: idx_536356_ll_uuid; Type: INDEX; Schema: parcels_production; Owner: pgloader_pg
--

CREATE UNIQUE INDEX idx_536356_ll_uuid ON parcels_production.parcels_road USING btree (ll_uuid);


--
-- Name: idx_536359_latitude; Type: INDEX; Schema: parcels_production; Owner: pgloader_pg
--

CREATE UNIQUE INDEX idx_536359_latitude ON parcels_production.parcels_viewshed USING btree (latitude, longitude);


--
-- Name: idx_536367_path; Type: INDEX; Schema: parcels_production; Owner: pgloader_pg
--

CREATE UNIQUE INDEX idx_536367_path ON parcels_production.properties USING btree (path);


--
-- Name: idx_536370_type; Type: INDEX; Schema: parcels_production; Owner: pgloader_pg
--

CREATE INDEX idx_536370_type ON parcels_production.roads USING btree (type);


--
-- Name: idx_536375_z; Type: INDEX; Schema: parcels_production; Owner: pgloader_pg
--

CREATE UNIQUE INDEX idx_536375_z ON parcels_production.tiles USING btree (z, y, x);


--
-- PostgreSQL database dump complete
--
