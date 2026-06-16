import Booking from '../models/BookingModel.js';
import Item from "../models/itemsCollection.js";


export const createBooking = async (req, res) => {
    try {
        const { itemId } = req.body;  //request send item id in json body

        if (req.user.role !== "customer") {
            return res.status(403).json({
                success: false,
                message: "Only customers can create bookings",
            });
        }

        const item = await Item.findById(itemId);

        if (!item) {
            return res.status(404).json({
                success: false,
                message: "vechile not Found"
            });
        }

        const booking = await Booking.create({
            itemId: item._id,
            renterId: req.user.id,
            ownerId: item.ownerId,
            
        });

        return res.status(201).json({
            success: true,
            message: "Booking request created successfully",
            booking,
        });


    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Server error while creating booking",
        });
    }
}

export const updateStatus = async (req, res) => {       //6a2b9e2ddd54963a10068629
    try {
        const { id } = req.params; 1

        const booking = await Booking.findById(id);
        const { status } = req.body;


        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found",
            });
        }

        // Sirf item ka owner approve kar sakta hai
        if (
            req.user.role !== "owner" ||
            booking.ownerId.toString() !== req.user.id
        ) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to approve this booking",
            });
        }

        booking.status = status;

        // Agar approve hua to item unavailable kar do
        const item = await Item.findById(booking.itemId);

        if (item) {
            if (status === "approved") {
                item.isAvailable = false;
            }

            if (status === "completed" || status === "cancelled") {
                item.isAvailable = true;
            }

            await item.save();
        }

        await booking.save();

        return res.status(200).json({
            success: true,
            message: "Booking status updated",
            booking
        })

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Server Error while updating booking status"
        })
    }

}


export const getMyBookings = async (req, res) => {
    try {

        const bookings = await Booking.find({
            renterId: req.user.id,
        })
            .populate("itemId")  // res whole object
            .populate("ownerId", "name email")
            .sort({ createdAt: -1 });


        console.log(req.user.id);

        return res.status(200).json({
            success: true,
            count: bookings.length,
            bookings,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};