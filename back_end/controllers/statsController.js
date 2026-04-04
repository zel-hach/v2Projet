import User from "../models/User.js";
import DailyCups from "../models/DailyCups.js";

function escapeRegex(s) {
  return String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function statusMatchesAny(values) {
  return {
    $or: values.map((v) => ({
      status: new RegExp(`^${escapeRegex(v)}$`, "i"),
    })),
  };
}

const excludeAuth = { $nor: [{ role: "admin" }, { role: "viewer" }] };

function lastNDayKeys(n) {
  const keys = [];
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  for (let i = n - 1; i >= 0; i--) {
    const x = new Date(d);
    x.setDate(x.getDate() - i);
    const y = x.getFullYear();
    const m = String(x.getMonth() + 1).padStart(2, "0");
    const day = String(x.getDate()).padStart(2, "0");
    keys.push(`${y}-${m}-${day}`);
  }
  return keys;
}

function dayLabelFr(dayKey) {
  const d = new Date(`${dayKey}T12:00:00`);
  return d.toLocaleDateString("fr-FR", { weekday: "short" });
}

export async function getDashboardStats(req, res) {
  try {
    const [investisseurCount, etudiantCount, visiteurCount, sumUsersCupsAgg] = await Promise.all([
      User.countDocuments({
        $and: [excludeAuth, statusMatchesAny(["fonctionnaire", "cto", "entrepreneur"])],
      }),
      User.countDocuments({
        $and: [excludeAuth, statusMatchesAny(["titulaire", "étudiant", "etudiant"])],
      }),
      User.countDocuments({ $and: [excludeAuth] }),
      User.aggregate([
        { $match: excludeAuth },
        {
          $group: {
            _id: null,
            total: {
              $sum: {
                $convert: { input: "$cupsToday", to: "double", onError: 0, onNull: 0 },
              },
            },
          },
        },
      ]),
    ]);

    const sumUsersCupsToday = sumUsersCupsAgg[0]?.total ?? 0;

    const dayKeys = lastNDayKeys(7);
    const todayKey = dayKeys[dayKeys.length - 1];
    const dailyDocs = await DailyCups.find({ dayKey: { $in: dayKeys } }).lean();
    const dailyMap = Object.fromEntries(dailyDocs.map((d) => [d.dayKey, d.cups]));

    const cupsByDay = dayKeys.map((dayKey) => {
      const stored = Number(dailyMap[dayKey]) || 0;
      /** Aujourd’hui : somme des tasses par visiteur ; jours passés : total enregistré (DailyCups). */
      const cups = dayKey === todayKey ? sumUsersCupsToday : stored;
      return {
        dayKey,
        label: dayLabelFr(dayKey).replace(/^\w/, (c) => c.toUpperCase()),
        cups: Math.max(0, cups),
      };
    });

    const totalCups = cupsByDay.reduce((s, x) => s + x.cups, 0);

    res.status(200).json({
      investisseurCount,
      etudiantCount,
      visiteurCount,
      totalCups,
      cupsByDay,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
