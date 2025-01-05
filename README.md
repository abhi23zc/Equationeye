# EquationEye 📐

EquationEye is an innovative web application that uses Google's Generative AI (Gemini) to analyze and solve mathematical problems from images. Simply on the camera ,it will detect math problem, and  will provide you with the solution along with detailed step-by-step explanations.

## 🌟 Features

- Image-based math problem detection
- Step-by-step problem solving explanations
- Support for various types of mathematical problems
- Clean and intuitive user interface
- Real-time analysis and results

## 🚀 Tech Stack

- Frontend: React.js & Tailwind css
- AI Integration: Google Generative AI (Gemini 1.5)
- Image Processing: Base64 encoding


## 📋 Prerequisites

Before you begin, ensure you have:
- Node.js (v14 or higher)
- Gemeni AI API key
- Modern web browser (Chrome, Firefox, Safari, or Edge)

## ⚙️ Installation

1. Clone the repository:
```bash
git clone https://github.com/abhi23zc/Equationeye.git
cd equationeye
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Gemini API key:
```env
VITE_APIKEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

## 🔧 Usage

1. Open the application in your web browser
2. Wait for the analysis to complete
3. View the problem, solution, and step-by-step explanation

## 📝 Example Response Format

```json
{
  "problem": "7 × 2 = ?",
  "solution": "14",
  "steps": [
    "The problem is a simple multiplication problem.",
    "Multiply 7 by 2: 7 × 2 = 14"
  ]
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 👏 Acknowledgments

- Google Generative AI team for the Gemini API
- Contributors and testers who helped improve the application

## 🔗 Contact

If you have any questions or suggestions, please open an issue in the repository or contact the maintainers.

---
Made with ❤️ for mathematics and education
