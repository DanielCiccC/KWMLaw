import imaplib
import email
import time
from email.header import decode_header

# Your Gmail account details
EMAIL = "kwmlaw@outlook.com"
PASSWORD = "KWM2023FTW"  
SMTP_SERVER = "smtp-mail.outlook.com"
SMTP_PORT = 993

# Connect to Gmail's IMAP server
mail = imaplib.IMAP4_SSL(SMTP_SERVER)
mail.login(EMAIL, PASSWORD)
mail.select("inbox")  # You can select other mailboxes as well

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
                        # else:
                        #     text = part.get_payload(decode=True).decode()
                        #     print("Message:", text)
                else:
                    text = msg.get_payload(decode=True).decode()
                    print("Message:", text)
                
                print("\n" + "=" * 40 + "\n")  # Separator between emails
    time.sleep(5)
# Logout and close the connection
# mail.logout()