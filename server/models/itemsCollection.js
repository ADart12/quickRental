  import mongoose from 'mongoose';

  const itemSchema = new mongoose.Schema({
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    pricePerDay: {
      type: Number,
      required: true,
    },

    securityDeposit: {
      type: Number,
      default: 0,
    },

    images: [{
      type: String,
    }],

    location: {
      type: String,
      required: true,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },
  }, {
    timestamps: true,
  });

  export default mongoose.model("Item", itemSchema);