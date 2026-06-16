import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle",
    required: true,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  // Vehicle kis branch se li gayi
  pickupBranch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
    required: true,
  },

  // User kis branch me return karega
  returnBranch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
  },

  startDate: {
    type: Date,
    required: true,
  },

  expectedReturnDate: {
    type: Date,
    required: true,
  },

  actualReturnDate: {
    type: Date,
  },

  totalAmount: {
    type: Number,
    default: 0,
  },

  bookingStatus: {
    type: String,
    enum: [
      "pending",
      "approved",
      "active",
      "completed",
      "cancelled",
      "rejected"
    ],
    default: "pending",
  }

}, {
  timestamps: true,
});

export default mongoose.model("Booking", bookingSchema);