from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import pickle
import injestion as inj
import PyPDF2


#function to create a audit of each email, with a score

def pickle_dictionary(dictionary, file_path):
    with open(file_path, 'wb') as file:
        pickle.dump(dictionary, file)
    print("Dictionary pickled and saved to", file_path)

def unpickle_dictionary(file_path):
    with open(file_path, 'rb') as file:
        unpickled_dict = pickle.load(file)
    return unpickled_dict

def read_pdf(pdf_file_path):
    try:
        # Open the PDF file in binary read mode
        with open(pdf_file_path, 'rb') as pdf_file:
            # Create a PDF reader object
            pdf_reader = PyPDF2.PdfFileReader(pdf_file)
            
            # Initialize an empty string to store the text content
            text_content = ""
            
            # Iterate through each page in the PDF
            for page_num in range(pdf_reader.numPages):
                # Get the page
                page = pdf_reader.getPage(page_num)
                
                # Extract text from the page
                page_text = page.extractText()
                
                # Append the page's text to the overall text content
                text_content += page_text
            
            return text_content

    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return None

# develops the corpus from all the documents that Lois gave me
def develop_corpus():
    main_corpus = ""
    for i in range(1): #lets keep this at 1 for now
        print(f"Read in document {i}----")
        main_corpus += read_pdf(f'in/{i}.pdf')
    return main_corpus


def calculate_tfidf(input_text):
    # Create a TfidfVectorizer
    tfidf_vectorizer = TfidfVectorizer()

    # Fit and transform the input text
    tfidf_matrix = tfidf_vectorizer.fit_transform([input_text])

    # Get the feature names (words) from the vectorizer
    feature_names = tfidf_vectorizer.get_feature_names_out()

    # Get the TF-IDF scores from the matrix
    tfidf_scores = tfidf_matrix.toarray()[0]

    # Create a dictionary of words and their corresponding TF-IDF scores
    tfidf_dict = {word: score for word, score in zip(feature_names, tfidf_scores)}

    return sorted(tfidf_dict)

#read in the sensitive text from chat GPT word list
def read_sensitive_text():
    with open('in/sens_word_list.txt', 'r') as sensitive_word_list:
        words = sensitive_word_list.read().split(',')
    return words


print(read_sensitive_text())