
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export async function exportElementToPDF(element: HTMLElement, filename: string) {
  const canvas = await html2canvas(element, { scale: 2 })
  const imgData = canvas.toDataURL('image/png')
  const pdf = new jsPDF({ orientation:'landscape', unit:'pt', format:'a4' })
  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()
  const imgWidth = pageWidth - 40
  const imgHeight = canvas.height * (imgWidth / canvas.width)
  const y = (pageHeight - imgHeight)/2
  pdf.addImage(imgData, 'PNG', 20, Math.max(20, y), imgWidth, imgHeight)
  pdf.save(filename)
}
