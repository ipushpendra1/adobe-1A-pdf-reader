import * as pdfParseModule from "pdf-parse";
const pdfParse = pdfParseModule.default || pdfParseModule;

export const uploadPost = async (req, res) => {
  try {
    if (!req.file) {
      console.log("❌ No file uploaded.");
      return res.status(400).json({ message: "No file uploaded" });
    }

    console.log("📄 File received:", req.file.originalname);
    const dataBuffer = req.file.buffer;

    const data = await pdfParse(dataBuffer); // ✅ Now this works
    console.log("✅ PDF parsed successfully");

    const lines = data.text.split("\n").map(line => line.trim()).filter(line => line);
    const outline = [];

    const title = lines[0] || "Untitled Document";

    lines.forEach(line => {
      if (line.toUpperCase() === line && line.length > 5) {
        outline.push({ level: "H1", text: line, page: null });
      } else if (line.match(/^([A-Z][a-z]+\s){1,4}$/)) {
        outline.push({ level: "H2", text: line, page: null });
      } else if (line.length > 10 && line.length < 60) {
        outline.push({ level: "H3", text: line, page: null });
      }
    });

    res.json({ title, outline });
  } catch (err) {
    console.error("❌ Error parsing PDF:", err);
    res.status(500).json({ message: "Failed to process PDF" });
  }
};
