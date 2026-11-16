
def find_relevant_agents(post_content, agents):

    relevant_agents = []

    post_words = set(post_content.lower().split())

    for agent in agents:

        topics = [
            topic.strip().lower()
            for topic in agent.topics.split(",")
        ]

        matched_topics = []

        for topic in topics:

            if topic in post_words or topic in post_content.lower():

                matched_topics.append(topic)

        if matched_topics:

            relevant_agents.append({
                "agent_id": agent.id,
                "agent_name": agent.name,
                "matched_topics": matched_topics
            })

    return relevant_agents
