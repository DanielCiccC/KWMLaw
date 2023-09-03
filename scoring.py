from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import pickle


#function to create a audit of each email, with a score

def pickle_dictionary(dictionary, file_path):
    with open(file_path, 'wb') as file:
        pickle.dump(dictionary, file)
    print("Dictionary pickled and saved to", file_path)

def unpickle_dictionary(file_path):
    with open(file_path, 'rb') as file:
        unpickled_dict = pickle.load(file)
    return unpickled_dict

# Example usage
main_corpus = [
    "This is some example text."+
    "Here's another sentence in the corpus." +
    "Text processing is important for NLP tasks."+
    "Python is a popular programming language for data science."+
    "Natural language understanding is a challenging task."
]

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


print(calculate_tfidf(main_corpus[0]))