import praw
from transformers import pipeline

# 🔹 Reddit API Credentials
reddit = praw.Reddit(
    client_id="3X1F8aFlUfguxneIdadSHA",
    client_secret="V0o42PK0DcO3LeeifG_TJ0ZiAWHMDA",
    user_agent="invest_nexus",
    username="NextStage2655",
    password="investnexus@123"
)

# 🔹 Load Sentiment Analysis Model
sentiment_analyzer = pipeline("sentiment-analysis")


def get_reddit_comments(topic, subreddit="startups", limit=10):
    """Fetch top comments from Reddit discussions."""
    discussions = []
    
    for post in reddit.subreddit(subreddit).search(topic, limit=limit):
        post.comments.replace_more(limit=0)  # Load all comments
        comments = [comment.body for comment in post.comments.list()[:10]]  # Get top 10 comments
        discussions.append({"title": post.title, "comments": comments, "url": post.url})
    
    return discussions


def analyze_market_demand(topic):
    """Get discussions from Reddit & analyze sentiment of comments."""
    print(f"\n🔍 Searching Reddit for: {topic}...\n")
    
    results = get_reddit_comments(topic)
    if not results:
        print("❌ No discussions found. Try a different topic.")
        return 0,0
    
    market_sentiments = []
    
    for post in results:
        # print(f"\n🔸 **{post['title']}** ({post['url']})")
        
        sentiments = []
        for comment in post["comments"]:
            sentiment = sentiment_analyzer(comment)[0]
            sentiments.append(sentiment)
            print(f"  💬 {comment} -> {sentiment['label']} ({sentiment['score']:.2f})")
        
        market_sentiments.extend(sentiments)
    
    # 🔹 Calculate Overall Sentiment Score
    pos_count = sum(1 for s in market_sentiments if s["label"] == "POSITIVE")
    neg_count = sum(1 for s in market_sentiments if s["label"] == "NEGATIVE")
    total = len(market_sentiments)

    if total > 0:
        pos_percentage = (pos_count / total) * 100
        neg_percentage = (neg_count / total) * 100
        return pos_percentage,neg_percentage
    else:
        print("\n⚠️ Not enough comments for sentiment analysis.")
        return 0,0


# # 🔹 Example Usage
# startup_idea = input("Enter your startup idea: ")
# analyze_market_demand(startup_idea)
