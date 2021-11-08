import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# https://www.youtube.com/watch?v=XoTwndOgXBM&t=4525s
# https://github.com/codeheroku/Introduction-to-Machine-Learning/tree/master/Building%20a%20Movie%20Recommendation%20Engine


def recommend_movie(title):
    print("Recommending:",title)

    ##Step 1: Read CSV File
    df = pd.read_csv("movies_metadata.csv")

    def get_title_from_index(index):
	    return df[df.index == index]["title"].values[0]

    def get_index_from_title(title):
	    return df[df.title == title]["index"].values[0]

    ##Step 2: Select Features
    features = ['keywords','cast','genres','director']

    ##Step 3: Create a column in DF which combines all selected features
    for feature in features:
        df[feature] = df[feature].fillna('')

    def combine_features(row):
        try:
            return row['keywords'] +" "+row['cast']+" "+row["genres"]+" "+row["director"]
        except:
            print("Error:", row	)

    df["combined_features"] = df.apply(combine_features,axis=1)


    ##Step 4: Create count matrix from this new combined column
    cv = CountVectorizer()

    count_matrix = cv.fit_transform(df["combined_features"])

    ##Step 5: Compute the Cosine Similarity based on the count_matrix
    cosine_sim = cosine_similarity(count_matrix) 
    movie_user_likes = title

    ## Step 6: Get index of this movie from its title

    # if movie not in CSV / no data to recommend
    try:
        movie_index = get_index_from_title(movie_user_likes)
    except:
        return []

    similar_movies =  list(enumerate(cosine_sim[movie_index]))

    ## Step 7: Get a list of similar movies in descending order of similarity score
    sorted_similar_movies = sorted(similar_movies,key=lambda x:x[1],reverse=True)
    output = []
    ## Step 8: Print titles of first 5 movies
    # First index is itself so we skip the first movie
    for element in sorted_similar_movies[1:11]:
       output.append(get_title_from_index(element[0]))

    return(output)
