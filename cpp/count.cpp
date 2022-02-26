// LICENSE: CC0
// http://usaco.org/index.php?page=viewproblem2&cpid=1115
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

ll pow3[40];
map<tuple<ll, ll, ll>, ll> mem;
map<tuple<ll, ll, ll>, bool> vis;

ll num_intersections(ll sx, ll sy, ll d) {
	if(vis[make_tuple(sx, sy, d)]) {
		return mem[make_tuple(sx, sy, d)];
	}
	ll ex = sx + d, ey = sy + d;
	int l = 0, r = 39, mid; // r always works
	while(l < r) {
		mid = (l + r) / 2;
		if((pow3[mid] - 1) >= ex && (pow3[mid] - 1) >= ey) {
			r = mid;
		} else {
			l = mid + 1;
		}
	}
	int n = r;

	//cout << n << ' ' << sx << ' ' << sy << ' ' << ex << ' ' << ey << '\n';
	if(n == 0) {
		int ans = 1;
		while(sx > 0 || sy > 0) {
			//cout << sx << ' ' << sy << '\n';
			if(((sx % 3) % 2) != ((sy % 3) % 2)) {
				ans = 0;
				break;
			}
			sx /= 3;
			sy /= 3;
		}
		return ans;
	}

	ll x1[5] = {0,                  0,                  pow3[n - 1],            2 * pow3[n - 1],    2 * pow3[n - 1]};
	ll x2[5] = {pow3[n - 1] - 1,    pow3[n - 1] - 1,    2 * pow3[n - 1] - 1,    pow3[n] - 1,        pow3[n] - 1};
	ll y1[5] = {0,                  2 * pow3[n - 1],    pow3[n - 1],            0,                  2 * pow3[n - 1]};
	ll y2[5] = {pow3[n - 1] - 1,    pow3[n] - 1,        2 * pow3[n - 1] - 1,    pow3[n - 1] - 1,    pow3[n] - 1};
	
	ll ans = 0;
	for(int i = 0; i < 5; i++) {
		ll left_intersection_y = x1[i] + sy - sx;
		ll right_intersection_y = x2[i] + sy - sx;
		ll top_intersection_x = y1[i] + sx - sy;
		ll bottom_intersection_x = y2[i] + sx - sy;

		if(y1[i] <= left_intersection_y && left_intersection_y <= y2[i]
		&& x1[i] <= bottom_intersection_x && bottom_intersection_x <= x2[i]
		&& sx <= bottom_intersection_x && ex >= x1[i]
		&& sy <= y2[i] && ey >= left_intersection_y) {
			ll nsx = max(x1[i], sx);
			ll nex = min(bottom_intersection_x, ex);
			nsx %= pow3[n - 1];
			nex %= pow3[n - 1];
			
			ll nsy = max(left_intersection_y, sy);
			ll ney = min(y2[i], ey);
			nsy %= pow3[n - 1];
			ney %= pow3[n - 1];

			ans += num_intersections(nsx, nsy, nex - nsx);
		}
		else if(y1[i] <= right_intersection_y && right_intersection_y <= y2[i]
		&& x1[i] <= top_intersection_x && top_intersection_x <= x2[i]
		&& sx <= x2[i] && ex >= top_intersection_x
		&& sy <= right_intersection_y && ey >= y1[i]) {
			ll nsx = max(top_intersection_x, sx);
			ll nex = min(x2[i], ex);
			nsx %= pow3[n - 1];
			nex %= pow3[n - 1];

			ll nsy = max(y1[i], sy);
			ll ney = min(right_intersection_y, ey);
			nsy %= pow3[n - 1];
			ney %= pow3[n - 1];

			ans += num_intersections(nsx, nsy, nex - nsx);
		}
	}
	vis[make_tuple(sx, sy, d)] = true;
	mem[make_tuple(sx, sy, d)] = ans;
	return ans;
}	

int main() {
	pow3[0] = 1;
	for(int i = 1; i <= 39; i++) {
		pow3[i] = pow3[i - 1] * 3;
	}
	int Q; cin >> Q;
	while(Q--) {
		long long d, x, y; cin >> d >> x >> y;
		cout << num_intersections(x, y, d) << '\n';
	}
}
