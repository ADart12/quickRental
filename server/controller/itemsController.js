import Item from '../models/itemsCollection.js';

export const addItem = async (req, res) => {
    try {
        const {
            title,
            category,
            description,
            pricePerDay,
            securityDeposit,
            images,
            location,
        } = req.body;

        // Validation
        if (!title || !category || !pricePerDay || !location) {
            return res.status(400).json({
                success: false,
                message: "Required fields are missing",
            });
        }

        if (req.user.role !== "owner") {
            return res.status(400).json({
                success: false,
                message: "Only Rental owner are allowed to add item",
            })
        }

        const newItem = new Item({
            ownerId: req.user.id, // JWT middleware se aayega
            title,
            category,
            description,
            pricePerDay,
            securityDeposit,
            images,
            location,
        });

        await newItem.save();

        return res.status(201).json({
            success: true,
            message: "Item added successfully",
            item: newItem,
        });
    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    };

};

export const getAllItem = async (req, res) => {
    try {

        const items = await Item.find();
        return res.status(200).json({
            success: true,
            count: items.legnth,
            items
        });

    } catch (error) {
        console.error("Get All Items Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error while getting"
        })
    }
}

export const getItemById = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Item dosen't exist with this id"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Item find successfully",
            item
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "server error while getting ItemById",
            err
        })
    }
}

export const getMyItem = async (req, res) => {
    try {

        if (req.user.role !== "owner") {
            return res.status(400).json({
                success: false,
                message: "tune add nai karskata to myitem kya dhud raaha he",
            })
        }

        const items = await Item.find({
            ownerId: req.user.id
        })

        if (items.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Items Not Found",
            });
        }

        return res.status(200).json({
            success: true,
            count: items.length,
            message: "My Items find scucessfully",
            items
        })


    } catch (err) {
        console.log("user is here", req.user);

        return res.status(500).json({
            success: false,
            message: "Server errror While finding My items herher",
            err,
        })
    }
}

export const updateItem = async (req, res) => {
    try {
        const itemId = req.params.id;

        if (req.user.role !== "owner") {
            return res.status(403).json({
                success: false,
                message: "Only Rental owner are allowed to update item",
            })
        }

        const item = await Item.findById(itemId);

        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Items not Found for update",
            });
        }

        if (item.ownerId.toString() !== req.user.id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this item"

            });
        }

        const updatedItem = await Item.findByIdAndUpdate(
            itemId,
            req.body, {
            new: true,
            runValidators: true
        }
        );

        return res.status(200).json({
            success: true,
            message: "Item Updated Successfully",
            updatedItem
        });

    } catch (error) {
        console.log("whileUpdating: ", error)
        return res.status(500).json({
            success: false,
            message: "Server error While updating Item"
        });
    }
}


export const deleteItem = async (req, res) => {
    try {
        const itemId = req.params.id;

        const item = await Item.findById(itemId);

        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Item cannot find for deleting",
            })
        } 
        if (req.user.role !== "owner") {
            return res.status(400).json({
                success: false,
                message: "Only Rental owner are allowed to delete Item",
            })
        }


        if (item.ownerId.toString() !== req.user.id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are NOt authorized to delete this item",
            })
        }

        await Item.findByIdAndDelete(itemId);
        return res.status(200).json({
            success: true,
            message: "Item deleted Sucessfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "server Error while deleting Item"
        })
    }
}