const Sequelize = require('sequelize');
const { Model } = Sequelize;

const sequelize = new Sequelize({
  host: 'localhost',
  database: 'postgis_test',
  dialect: 'postgres',
  logging: false,
});

async function main() {
  await sequelize.authenticate();
  console.log('Connected to DB');
  
  BlogPost.init({
    created_at: { type: Sequelize.DATE, allowNull: false },
    title: { type: Sequelize.STRING, allowNull: false },
    message: { type: Sequelize.STRING, allowNull: false },
  }, {
    sequelize,
    modelName: 'BlogPost',

    paranoid: true,
  });

  await sequelize.sync();

  await BlogPost.create({
    created_at: new Date(),
    title: 'Hello',
    message: 'Blog',
  });

  await BlogPost.update({
    title: 'New title'
  }, {
    where: { message: 'Blog' }
  });

  await BlogPost.destroy({
    where: { title: 'New title' },
  })

  const newPost = await BlogPost.findAll({
    where: { title: 'New title' },
    attributes: ['id']
  })

}

class BlogPost extends Model {}

main();
