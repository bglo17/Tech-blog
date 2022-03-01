const router = express.Router();

const homeRoutes = require('./homeRoutes');
const api = require ('./api');

router.use('/', homeRoutes);
router.use('/api', apiRoutes); 


module.exports = router; 