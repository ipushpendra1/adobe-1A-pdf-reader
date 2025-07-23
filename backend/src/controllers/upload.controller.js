const pdfParse = require("pdf-parse");

exports.uploadPost = async (req, res) => {
  try {
    if (!req.file) {
      console.log("❌ No file uploaded.");
      return res.status(400).json({ message: "No file uploaded" });
    }

    console.log("📄 File received:", req.file.originalname);

    const dataBuffer = req.file.buffer;
    const data = await pdfParse(dataBuffer);

    const outline = [];
    let title = "Untitled Document";

    // Split text per page using Form Feed (\f)
    const pages = data.text.split(/\f/);

    pages.forEach((pageContent, pageIndex) => {
      const pageNumber = pageIndex; // ✅ 0-based page number

      const lines = pageContent
        .split("\n")
        .map(line => line.trim())
        .filter(line => line && !/^\s*$/.test(line)); // Remove empty lines

      lines.forEach(line => {
        // Skip irrelevant or noisy lines
        if (
          line.length < 10 && // very short lines
          !/^[A-Z\s]+$/.test(line) && // not ALL CAPS
          !/^([A-Z][a-z]+\s?)+$/.test(line) // not Title Case
        ) return;

        // Set Title from first big line
        if (pageIndex === 0 && title === "Untitled Document" && line.length > 10) {
          title = line;
        }

        // Detect Heading Levels
        if (line === line.toUpperCase() && line.length >= 8) {
          // ALL CAPS = H1
          outline.push({ level: "H1", text: line, page: pageNumber });
        } else if (/^([A-Z][a-z]+(\s|$)){3,}/.test(line)) {
          // Title Case, 3+ words = H2
          outline.push({ level: "H2", text: line, page: pageNumber });
        } else if (line.endsWith(":") && line.length <= 70) {
          // Ends with colon = likely subheading
          outline.push({ level: "H3", text: line, page: pageNumber });
        }
      });
    });

    const result = { title, outline };

    console.log("✅ Adobe Round 1A JSON:", JSON.stringify(result, null, 2));
    res.json(result);

  } catch (err) {
    console.error("❌ Error parsing PDF:", err);
    res.status(500).json({ message: "Failed to process PDF" });
  }
};
