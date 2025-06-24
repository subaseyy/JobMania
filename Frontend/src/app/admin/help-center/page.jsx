"use client";

import { useState } from "react";
import { Search, MoreHorizontal } from "lucide-react";

// ContactPopup Component
function ContactPopup({ contactForm, onInputChange, onSubmit, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Contact Support</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={contactForm.name}
              onChange={onInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={contactForm.email}
              onChange={onInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              How can we help?
            </label>
            <textarea
              id="message"
              name="message"
              value={contactForm.message}
              onChange={onInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ArticleCard Component
function ArticleCard({ article, feedback, onFeedback }) {
  return (
    <div className="border border-gray-200 rounded-md p-4 flex justify-between">
      <div className="w-full">
        <h3 className="font-semibold text-gray-900 mb-2">{article.title}</h3>
        <p className="text-gray-600 text-sm mb-4">{article.content}</p>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="text-gray-500">Was this article helpful?</span>
          <button
            className={`hover:underline ${
              feedback === true ? "text-green-600" : "text-blue-600"
            }`}
            onClick={() => onFeedback(article.id, true)}
          >
            👍 Yes
          </button>
          <button
            className={`hover:underline ${
              feedback === false ? "text-red-600" : "text-blue-600"
            }`}
            onClick={() => onFeedback(article.id, false)}
          >
            👎 No
          </button>
          {feedback !== undefined && (
            <span className="text-gray-500 text-xs">
              Thank you for your feedback!
            </span>
          )}
        </div>
      </div>
      <MoreHorizontal size={16} className="flex-shrink-0" />
    </div>
  );
}

// ArticleList Component
function ArticleList({ articles, helpfulFeedback, onFeedback }) {
  if (articles.length === 0) {
    return (
      <div className="text-center py-10 text-gray-600">
        No articles found matching your search.
      </div>
    );
  }
  return (
    <div className="space-y-4 md:space-y-6 max-h-[80vh] overflow-y-auto">
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          article={article}
          feedback={helpfulFeedback[article.id]}
          onFeedback={onFeedback}
        />
      ))}
    </div>
  );
}

// SearchSection Component
function SearchSection({ searchQuery, onSearchChange }) {
  return (
    <>
      <p className="font-medium text-sm text-gray-500 mb-2">
        Type your question or keyword
      </p>
      <div className="flex items-center border rounded px-3 py-2">
        <Search className="w-5 h-5 text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search"
          className="outline-none text-sm bg-gray-50 w-full"
          value={searchQuery}
          onChange={onSearchChange}
        />
      </div>
    </>
  );
}

// CategoryList Component
function CategoryList({ categories, activeCategory, onCategorySelect }) {
  return (
    <nav className="space-y-4 text-sm text-gray-700 mt-6">
      {categories.map((category) => (
        <div key={category}>
          <h4
            className={`cursor-pointer ${
              activeCategory === category
                ? "text-indigo-600 font-semibold"
                : "text-gray-600"
            }`}
            onClick={() => onCategorySelect(category)}
          >
            {category}
          </h4>
          <hr className="my-4" />
        </div>
      ))}
    </nav>
  );
}

// ContactCard Component
function ContactCard({ onContactClick }) {
  return (
    <div className="mt-6 bg-indigo-700 text-white p-4 relative overflow-hidden rounded-lg">
      <div className="absolute -bottom-10 -right-10 h-28 w-28 bg-white/10 rounded-full"></div>
      <div className="absolute -bottom-10 right-14 h-[4.5rem] w-[4.5rem] bg-white/10 rounded-full"></div>
      <h4 className="font-semibold text-lg mb-1">
        Didn't find what you were looking for?
      </h4>
      <p className="text-sm text-gray-100 mb-4">Contact our customer service</p>
      <button
        className="bg-white text-indigo-600 px-4 py-2 text-sm font-semibold hover:bg-gray-100 rounded-md"
        onClick={onContactClick}
      >
        Contact Us
      </button>
    </div>
  );
}

// HelpCenter Component
export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState("");
  const [helpfulFeedback, setHelpfulFeedback] = useState({});
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const [showContactPopup, setShowContactPopup] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sortOption, setSortOption] = useState("relevance");

  const handleFeedback = (articleId, isHelpful) => {
    setHelpfulFeedback((prev) => ({ ...prev, [articleId]: isHelpful }));
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your message! We'll get back to you soon.");
    setShowContactPopup(false);
    setContactForm({ name: "", email: "", message: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({ ...prev, [name]: value }));
  };

  const filteredArticles = ARTICLES.filter((article) =>
    searchQuery
      ? article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.content.toLowerCase().includes(searchQuery.toLowerCase())
      : article.category === activeCategory
  ).sort((a, b) => {
    if (sortOption === "az") return a.title.localeCompare(b.title);
    return 0;
  });

  return (
    <div className="container mx-auto py-6 px-4">
      {showContactPopup && (
        <ContactPopup
          contactForm={contactForm}
          onInputChange={handleInputChange}
          onSubmit={handleContactSubmit}
          onClose={() => setShowContactPopup(false)}
        />
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full lg:w-1/4 border-gray-200 bg-white p-4">
          <SearchSection
            searchQuery={searchQuery}
            onSearchChange={(e) => setSearchQuery(e.target.value)}
          />
          <CategoryList
            categories={CATEGORIES}
            activeCategory={activeCategory}
            onCategorySelect={(category) => {
              setActiveCategory(category);
              setSearchQuery("");
            }}
          />
          <ContactCard onContactClick={() => setShowContactPopup(true)} />
        </div>

        {/* Main Content */}
        <div className="w-full lg:w-3/4 p-4">
          <div className="flex items-center justify-between mb-4">
            <label className="text-sm text-gray-500 flex items-center space-x-2">
              <span>Sort by:</span>
              <select
                className="rounded px-2 py-1 border border-gray-300"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="relevance">Most relevant</option>
                <option value="az">A – Z</option>
              </select>
            </label>
          </div>
          <ArticleList
            articles={filteredArticles}
            helpfulFeedback={helpfulFeedback}
            onFeedback={handleFeedback}
          />
        </div>
      </div>
    </div>
  );
}

// Static Data
const CATEGORIES = [
  "Getting Started",
  "My Profile",
  "Applying for a job",
  "Job Search Tips",
  "Job Alerts",
];

const ARTICLES = [
  {
    id: 1,
    title: "What is My Applications?",
    content:
      "My Applications lets you track jobs during the application process.",
    category: "Getting Started",
  },
  {
    id: 2,
    title: "Access your application history",
    content: "Go to My Applications to see your history.",
    category: "Getting Started",
  },
  {
    id: 3,
    title: "Why aren’t my applications showing?",
    content: "Some job applications may not be trackable from external sites.",
    category: "Getting Started",
  },
  {
    id: 4,
    title: "Updating your profile",
    content: "Navigate to the 'My Profile' section to update details.",
    category: "My Profile",
  },
  {
    id: 5,
    title: "Resume formatting",
    content: "PDF, DOC, and DOCX formats are supported.",
    category: "My Profile",
  },
  {
    id: 6,
    title: "Create job alerts",
    content: "Save your search criteria to receive alerts.",
    category: "Job Alerts",
  },
  {
    id: 7,
    title: "Delete your account",
    content: "Visit Account Settings under Privacy.",
    category: "My Profile",
  },
  {
    id: 8,
    title: "Troubleshooting login",
    content: "Try resetting your password or clearing cache.",
    category: "Getting Started",
  },
  {
    id: 9,
    title: "Application statuses explained",
    content: "Statuses include Submitted, Viewed, Interview, etc.",
    category: "Applying for a job",
  },
  {
    id: 10,
    title: "Withdraw an application",
    content: "You can withdraw from My Applications.",
    category: "Applying for a job",
  },
  {
    id: 11,
    title: "Premium benefits",
    content: "Get priority search visibility and analytics.",
    category: "My Profile",
  },
  {
    id: 12,
    title: "Notification preferences",
    content: "Customize notifications from your account settings.",
    category: "My Profile",
  },
];
