function compare_versions(v1, v2, options) {
  var lexicographical = options && options.lexicographical,
    zeroExtend = options && options.zeroExtend,
    v1parts = v1.split('.'),
    v2parts = v2.split('.');

  function isValidPart(x) {
    return (lexicographical ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(x);
  }

  if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
    return NaN;
  }

  if (zeroExtend) {
    while (v1parts.length < v2parts.length) v1parts.push("0");
    while (v2parts.length < v1parts.length) v2parts.push("0");
  }

  if (!lexicographical) {
    v1parts = v1parts.map(Number);
    v2parts = v2parts.map(Number);
  }

  for (var i = 0; i < v1parts.length; ++i) {
    if (v2parts.length == i) {
      return 1;
    }

    if (v1parts[i] == v2parts[i]) {
      continue;
    }
    else if (v1parts[i] > v2parts[i]) {
      return 1;
    }
    else {
      return -1;
    }
  }

  if (v1parts.length != v2parts.length) {
    return -1;
  }

  return 0;
}

let Migrator = {

  migrations: [],

  migrate: (config, version_from, version_to) => {

    console.log(config);

    console.log(version_from, version_to);

    let direction = compare_versions(version_to, version_from);
    console.log('direction: ', direction);

    let required_migrations = [];

    switch (direction) {
      case 1:
        required_migrations = Migrator.migrations.filter((migration) => {
          return compare_versions(migration.version, version_from) > 0 && compare_versions(migration.version, version_to) <= 0;
        }).sort((migration_a, migration_b) => {
          return compare_versions(migration_a.version, migration_b.version);
        });
        required_migrations.forEach((migration) => {
          try {
            migration.up && migration.up(config);
          }
          catch (err){
            console.log(err);
          }
        });
        break;
      case -1:
        required_migrations = Migrator.migrations.filter((migration) => {
          return compare_versions(migration.version, version_from) <= 0 && compare_versions(migration.version, version_to) > 0;
        }).sort((migration_a, migration_b) => {
          return compare_versions(migration_b.version, migration_a.version);
        });
        required_migrations.forEach((migration) => {
          try {
            migration.down && migration.down(config);
          }
          catch (err){
            console.log(err);
          }
        });
        break;
    }

    console.log(required_migrations);

    return config;

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