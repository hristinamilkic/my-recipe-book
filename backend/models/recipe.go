package models

type Recipe struct {
    ID           int64  `json:"id"`
    Title        string `json:"title"`
    Ingredients  string `json:"ingredients"`
    Instructions string `json:"instructions"`
    IsPrivate    bool   `json:"is_private"`
    ImageURL     string `json:"image_url"`
    IsFavorite   bool   `json:"is_favorite"`
    PrivacyToken    string `json:"privacy_token"`
}
