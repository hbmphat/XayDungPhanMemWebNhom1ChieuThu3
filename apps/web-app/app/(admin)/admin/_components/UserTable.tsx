import Pagination from "@admin/_components/Pagination";
import { USERS } from "@admin/(dashboard)/users/types";
import UserRow from "@admin/_components/UserRow";

export default function UserTable() {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table
          className="min-w-full divide-y divide-slate-200"
          id="user-management-table"
        >
          <thead className="bg-slate-50">
            <tr>
              {["User", "Role", "Status", "Last Active", "Actions"].map(
                (head) => (
                  <th
                    key={head}
                    className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
                  >
                    {head}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {USERS.map((user) => (
              <UserRow key={user.id} user={user} />
            ))}
          </tbody>
        </table>
      </div>
      <Pagination />
    </div>
  );
}
