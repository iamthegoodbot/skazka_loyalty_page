function migration_steps(version_from, version_to) {

}

let Migrator = {

  migrations: [],

  migrate: (config, to_version) => {

    const migration_config = Migrator.migrations.filter((m_config) => {
      return to_version === m_config.version;
    });

  },

  create: (config) => {
    Migrator.migrations.push(config);
  }

};

if(typeof window !== 'undefined') {

  window.SAILPLAY = window.SAILPLAY || {};

  window.SAILPLAY.MagicMigrator = Migrator;

}

export default Migrator;