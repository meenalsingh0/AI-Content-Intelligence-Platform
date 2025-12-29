const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    content: {
      type: String,
      required: true,
    },

    source: {
      type: String,
      default: "BeyondChats",
    },

    isUpdated: {
      type: Boolean,
      default: false,
    },

    originalArticleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Article",
      default: null,
    },

    references: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Article", articleSchema);
