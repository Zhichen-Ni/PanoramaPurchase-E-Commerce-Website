# Query
This folder contains the sql queries that we use to setup data and some sample query for each feature

## Folder structure
```
.
├── drafts              # Some draft queries member created
├── Production          # Contains generated production data in txt file
├── sample              # Contains the sample data in txt file
├── setup               # Contains queries to prepare database, tables, triggers, and load some sample data
├── tests               # Contains test queries for features and their output
└── README.md
```

## Prerequsite
- MySQL Community Server v8.0.30
- MySQL Workbench v8.0.30

## Setup Database
1. Connect to the server via workbench
2. Execute the queries in `/setup/` in its numbered order
3. More detailed instruction for each step are in the sql files
