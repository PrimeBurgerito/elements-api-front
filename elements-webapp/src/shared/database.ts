import Dexie from 'dexie';

class Database extends Dexie {
  public images: Dexie.Table<IDbImages, number>;

  constructor() {
    super('Database');
    this.version(1).stores({
      images: 'name',
    });

    this.images = this.table('images');
  }
}

interface IDbImages {
  name: string;
  data: string;
}

const db = new Database();
db.version(1)
  .stores({ images: 'name' });

export default db;
