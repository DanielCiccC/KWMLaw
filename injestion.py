import imaplib
import email
import time
from email.header import decode_header
import fitz  # For handling PDFs, pip install PyMuPDF
from docx import Document  # For handling Word documents
from io import BytesIO

# Your Gmail account details
EMAIL = "kwmlaw@outlook.com"
PASSWORD = "KWM2023FTW"  
SMTP_SERVER = "smtp-mail.outlook.com"
SMTP_PORT = 993

# Connect to Gmail's IMAP server
mail = imaplib.IMAP4_SSL(SMTP_SERVER)
mail.login(EMAIL, PASSWORD)
mail.select("inbox")  # You can select other mailboxes as well

# Function to extract text from PDFs using PyMuPDF
def extract_pdf_text(pdf_bytes):
    pdf_io = BytesIO(pdf_bytes)
    pdf_document = fitz.open("pdf", pdf_io.read())
    text = ""
    for page_num in range(pdf_document.page_count):
        page = pdf_document.load_page(page_num)
        text += page.get_text("text")
    pdf_document.close()
    return text

# Function to extract text from Word documents
def extract_docx_text(docx_bytes):
    docx_io = BytesIO(docx_bytes)
    doc = Document(docx_io)
    text = ""
    for para in doc.paragraphs:
        text += para.text + "\n"
    return text

# Infinite loop to check for new emails
while True:
    # Search for all unseen emails
    status, email_ids = mail.search(None, "UNSEEN")

    if status == "OK":
        email_ids = email_ids[0].split()
        
        for email_id in email_ids:
            status, msg_data = mail.fetch(email_id, "(RFC822)")
            
            if status == "OK":
                raw_email = msg_data[0][1]
                msg = email.message_from_bytes(raw_email)
                
                print("Subject:", decode_header(msg["Subject"])[0][0])
                print("From:", decode_header(msg["From"])[0][0])
                
                if msg.is_multipart():
                    for part in msg.walk():
                        content_type = part.get_content_type()
                        content_disposition = str(part.get("Content-Disposition"))
                        
                        if "attachment" in content_disposition:
                            filename = part.get_filename()
                            if filename:
                                print("Attachment:", filename)
                                
                        if "attachment" in content_disposition:
                            filename = part.get_filename()
                            if filename:
                                attachment = part.get_payload(decode=True)
                                if content_type == "application/pdf":
                                    text = extract_pdf_text(attachment)
                                elif content_type == "application/msword" or "vnd.openxmlformats-officedocument.wordprocessingml.document" in content_type:
                                    text = extract_docx_text(attachment)
                                else:
                                    text = "Unsupported attachment type"
                                print("Attachment Text:", text)
                                
                else:
                    text = msg.get_payload(decode=True).decode()                
                print("\n" + "=" * 40 + "\n") 
    time.sleep(1)

# mail.logout()