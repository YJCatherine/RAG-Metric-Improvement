package main.java.com.example.demo.api;

import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

public class PineconeQuery {
    public static void main(String[] args) {
        String apiKey = "your-pinecone-api-key";
        String indexUrl = "https://your-index-url.svc.pinecone.io/vectors/query";

        try (CloseableHttpClient client = HttpClients.createDefault()) {
            HttpPost httpPost = new HttpPost(indexUrl);
            httpPost.setHeader("Api-Key", apiKey);
            httpPost.setHeader("Content-type", "application/json");

            String jsonBody = "{\"topK\": 5, \"queries\": [[0.1, 0.2, ..., 0.3]]}";
            httpPost.setEntity(new StringEntity(jsonBody));

            var response = client.execute(httpPost);
            String result = EntityUtils.toString(response.getEntity());
            System.out.println("Response: " + result);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
