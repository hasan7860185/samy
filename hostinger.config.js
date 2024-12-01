export default {
  type: 'nodejs',
  build: {
    command: 'npm run build',
    output: 'dist'
  },
  env: {
    MONGODB_URI: 'mongodb+srv://real-estate:${MONGODB_PASSWORD}@cluster0.mongodb.net/real-estate-db',
    NODE_VERSION: '20'
  }
}