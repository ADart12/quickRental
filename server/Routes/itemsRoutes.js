import express from 'express';
import auth from '../middleWare/authMiddleware.js';
import { addItem, getAllItem, getItemById, getMyItem, updateItem, deleteItem } from '../controller/itemsController.js';


const router = express.Router();

router.post('/additem', auth, addItem);
router.get('/', getAllItem);

// get my items (get my vechile)
router.get('/my-item', auth ,getMyItem )


//dynamic routes
router.get('/:id', getItemById);

//update items
router.put("/update/:id", auth, updateItem);

//delete
router.delete("/delete/:id", auth, deleteItem);

export default router;