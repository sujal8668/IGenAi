import userModel from "../model/userModel.js";
import FormData from "form-data";
import axios from "axios";

export const generateImage = async (req, res) => {
  try {
    const { prompt } = req.body;

    // Validate prompt
    if (!prompt) {
      return res.status(400).json({ success: false, message: "Prompt is required" });
    }

    // Get user ID from auth middleware
    const userId = req.user?.id;

    // Validate user
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Check credit balance
    if (user.creditBalance <= 0) {
      return res.status(403).json({
        success: false,
        message: "No Credit Balance",
        creditBalance: user.creditBalance,
      });
    }

    // Prepare prompt data
    const formData = new FormData();
    formData.append("prompt", prompt);

    // Call ClipDrop API
    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          "x-api-key": process.env.CLIPDROP_API,
        },
        responseType: "arraybuffer",
      }
    );

    // Convert image to base64
    const base64Image = Buffer.from(data, "binary").toString("base64");
    const resultImage = `data:image/png;base64,${base64Image}`;

    // Deduct 1 credit
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { $inc: { creditBalance: -1 } },
      { new: true }
    );

    // Success
    res.json({
      success: true,
      message: "Image Generated",
      creditBalance: updatedUser.creditBalance,
      resultImage,
    });

  } catch (error) {
    console.error("Error generating image:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
