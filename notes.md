Export schema
```
pg_dump -U pgloader_pg -W -h localhost --schema-only parcels_production > schema.sql
scp database:/home/user/schema.sql ./db/schema.postgres.sql
```