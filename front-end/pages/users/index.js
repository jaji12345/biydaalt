import { useState, useEffect } from "react";
import { User, UserPlus, Edit, Trash2 } from "lucide-react";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // New state for editing
  const [editingUser, setEditingUser] = useState(null);

  // Get request
  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:4000/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setPosts(data);
      setError(null);
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Post request
  const handleCreatePost = async () => {
    if (!name || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:4000/createUsers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create user");
      }

      // Reset form fields
      setName("");
      setEmail("");
      setPassword("");
      setError(null);

      // Refetch users
      await fetchUsers();
    } catch (err) {
      setError(err.message || "Error creating user");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-white text-gray-600 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
          Users
        </h1>

        {/* User Creation/Update Form */}
        <div className="bg-dark rounded-lg shadow-md p-6 mb-8   drop-shadow-lm">
          <div className="grid md:grid-cols-1 gap-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Username"
              className="w-full p-3 bg-gray-200 text-gray-600 rounded focus:ring-2 focus:ring-gray-400 outline-none"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-3 bg-gray-200 text-gray-600 rounded focus:ring-2 focus:ring-gray-400 outline-none"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 bg-gray-200 text-gray-600 rounded focus:ring-2 focus:ring-gray-400 outline-none"
            />

            {error && <p className="text-red-400 mt-2 text-center">{error}</p>}

            <button
              onClick={editingUser ? handleUpdateUser : handleCreatePost}
              disabled={isLoading}
              className="w-full mt-4 p-3 bg-blue-600 text-gray-100 rounded hover:bg-blue-700 transition flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              
                <>
                  <span>{isLoading ? "Creating..." : "Create User"}</span>
                </>
          
            </button>

            {editingUser && (
              <button
                onClick={() => {
                  setEditingUser(null);
                  setName("");
                  setEmail("");
                  setPassword("");
                }}
                className="w-full mt-2 p-3 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </div>

        {/* Users List */}
        <h2 className="text-xl md:text-2xl font-bold mb-6 text-center">
          Registered Users
        </h2>

        {isLoading ? (
          <div className="text-center text-gray-400">Loading users...</div>
        ) : posts.length === 0 ? (
          <div className="text-center text-gray-400">No users found</div>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post) => (
              <div
                key={post.user_id}
                className="bg-gray-200 drop-shadow-lm border-spacing-0.5 border-gray-200 rounded-lg p-5 shadow-md"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-800">
                    User #{post.user_id}
                  </span>
                  <User size={20} className="text-blue-400" />
                </div>
                <h3 className="text-gray-500 font-bold text-lg mb-2">
                  {post.username}
                </h3>
                <p className="text-gray-500 mb-2">{post.email}</p>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    {new Date(post.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
