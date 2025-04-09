import React, { useState } from "react";

function OcrScan() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to handle file selection
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    
    if (!file) {
      return;
    }
    
    // Check if file is an image
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file (PNG, JPEG, WEBP).");
      return;
    }
    
    setSelectedFile(file);
    setError(null);
    
    // Create preview URL
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };

  // Function to convert File object to Base64 string
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        // result includes "data:mime/type;base64," prefix, which we need to split off
        const base64String = reader.result.split(",")[1];
        // Also get the mime type
        const mimeType = reader.result.match(/:(.*?);/)[1];
        resolve({ base64String, mimeType });
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedFile) {
      setError("Please select an image file first.");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setExtractedText("");
    
    try {
      // Get API key from environment variable
      const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
      const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;
      
      // Convert the file to base64
      const { base64String, mimeType } = await fileToBase64(selectedFile);
      
      // Prepare request payload
      const requestBody = {
        contents: [{
          parts: [
            {
              text: "Extract all text visible in this image. Format it properly. Provide only the extracted text without any additional commentary."
            },
            {
              inline_data: {
                mime_type: mimeType,
                data: base64String
              }
            }
          ]
        }],
        generationConfig: {
          temperature: 0.1,
          topP: 1,
          topK: 32,
          maxOutputTokens: 4096,
        }
      };
      
      // Make the API call
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      
      // Handle response
      if (!response.ok) {
        let errorText = `API Error: ${response.status} ${response.statusText}`;
        try {
          const errorData = await response.json();
          errorText = `API Error: ${errorData.error?.message || JSON.stringify(errorData)}`;
        } catch (parseError) {
          console.error("Could not parse error response:", parseError);
        }
        throw new Error(errorText);
      }
      
      const data = await response.json();
      console.log("API Response:", data);
      
      // Extract and display the text
      if (data.candidates && data.candidates[0] && data.candidates[0].content && 
          data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
        const extractedText = data.candidates[0].content.parts[0].text;
        setExtractedText(extractedText.trim() || "(No text found or extracted)");
      } else if (data.candidates && data.candidates[0] && data.candidates[0].finishReason) {
        setError(`Could not extract text. Reason: ${data.candidates[0].finishReason}`);
      } else if (data.promptFeedback && data.promptFeedback.blockReason) {
        setError(`Request blocked. Reason: ${data.promptFeedback.blockReason}`);
      } else {
        setError('Could not extract text from the API response');
        console.error("Unexpected API response structure:", data);
      }
      
    } catch (error) {
      console.error("Error:", error);
      setError(`An error occurred: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">
        OCR Document Scanner
      </h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="border-dashed border-2 border-gray-300 p-6 rounded-md">
          <div className="flex flex-col items-center justify-center space-y-4">
            <label htmlFor="imageInput" className="cursor-pointer">
              <div className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                Select Image
              </div>
              <input
                type="file"
                id="imageInput"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </label>
            
            {previewUrl && (
              <div className="mt-4">
                <h3 className="text-lg font-medium mb-2">Preview:</h3>
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="max-h-80 rounded-md mx-auto"
                />
              </div>
            )}
          </div>
        </div>
        
        {error && (
          <div className="text-red-600 bg-red-50 p-4 rounded-md">
            {error}
          </div>
        )}
        
        <button
          type="submit"
          disabled={!selectedFile || isLoading}
          className={`w-full py-3 px-4 rounded-md font-medium ${
            !selectedFile || isLoading
              ? "bg-gray-400 text-gray-200 cursor-not-allowed"
              : "bg-green-600 text-white hover:bg-green-700"
          } transition`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Processing...
            </div>
          ) : (
            "Extract Text"
          )}
        </button>
      </form>
      
      {extractedText && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-3">Extracted Text:</h2>
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200 whitespace-pre-wrap">
            {extractedText}
          </div>
        </div>
      )}
    </div>
  );
}

export default OcrScan;
