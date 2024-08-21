const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

// Directorio base de capturas de pantalla
const screenshotsBaseDir = path.join(__dirname, '../features/step_definitions/screenshots');

// Función para crear PDF para una carpeta de características
function createPDFForFeature(featureDir, featureName) {
  if (!fs.existsSync(featureDir)) {
    console.error(`El directorio ${featureDir} no existe.`);
    return;
  }

  const doc = new PDFDocument();
  const pdfPath = path.join(featureDir, `${featureName}.pdf`);

  doc.pipe(fs.createWriteStream(pdfPath));

  doc.fontSize(18).text(`Reporte de Pruebas: ${featureName}`, { align: 'center' });
  doc.moveDown();

  fs.readdir(featureDir, (err, files) => {
    if (err) throw err;

    files.forEach(file => {
      const filePath = path.join(featureDir, file);

      if (path.extname(file) === '.png') {
        doc.addPage()
          .fontSize(12)
          .text(file.replace(/_/g, ' '), { align: 'center' })
          .moveDown();

        doc.image(filePath, { fit: [500, 500], align: 'center', valign: 'center' })
          .moveDown();
      }
    });

    doc.end();
  });
}

// Leer el directorio base de capturas de pantalla
fs.readdir(screenshotsBaseDir, (err, folders) => {
  if (err) throw err;

  folders.forEach(folder => {
    const featureDir = path.join(screenshotsBaseDir, folder);

    // Verifica si es un directorio y no un archivo
    if (fs.statSync(featureDir).isDirectory()) {
      createPDFForFeature(featureDir, folder);
    }
  });
});

// generar reporte estadístico
const reporter = require('cucumber-html-reporter');

const options = {
  theme: 'bootstrap',
  jsonFile: './cucumber_report.json',
  output: './reports/cucumber_report.html',
  reportSuiteAsScenarios: true,
  launchReport: true,
};

reporter.generate(options);