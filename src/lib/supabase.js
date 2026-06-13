const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

/**
 * Submits the cat score to Supabase
 */
export async function submitScore(catName, score, badge) {
  if (!supabaseUrl || !supabaseKey) {
    console.warn("Supabase credentials missing. Score not saved.");
    return false;
  }

  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/leaderboard`, {
      method: "POST",
      headers: {
        "apikey": supabaseKey,
        "Authorization": `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
        "Prefer": "return=minimal"
      },
      body: JSON.stringify({
        cat_name: catName,
        score: score,
        badge: badge
      })
    });

    return res.ok;
  } catch (err) {
    console.error("Failed to submit score:", err);
    return false;
  }
}

/**
 * Fetches the top 10 scores from Supabase
 */
export async function fetchLeaderboard() {
  if (!supabaseUrl || !supabaseKey) {
    return [];
  }

  try {
    const res = await fetch(
      `${supabaseUrl}/rest/v1/leaderboard?select=cat_name,score,badge,created_at&order=score.desc,created_at.asc&limit=10`,
      {
        method: "GET",
        headers: {
          "apikey": supabaseKey,
          "Authorization": `Bearer ${supabaseKey}`
        }
      }
    );

    if (!res.ok) throw new Error("Fetch failed");
    return await res.json();
  } catch (err) {
    console.error("Failed to fetch leaderboard:", err);
    return null;
  }
}
