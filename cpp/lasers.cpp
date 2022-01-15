// LICENSE: CC0
// http://www.usaco.org/index.php?page=viewproblem2&cpid=671
#include <bits/stdc++.h>
using namespace std;

vector<int> points_x[100005]; // x coords given a certain y
vector<int> points_y[100005]; // y coords given a certain x
int N, xl, yl, xb, yb;
bool vis[100005][2];

int main() {
	freopen("lasers.in", "r", stdin);
	freopen("lasers.out", "w", stdout);
	cin >> N >> xl >> yl >> xb >> yb;
	
	vector<pair<int, int>> points;
	set<int> x_coords_set;
	set<int> y_coords_set;

	x_coords_set.insert(xl);
	x_coords_set.insert(xb);

	y_coords_set.insert(yl);
	y_coords_set.insert(yb);

	points.push_back({xl, yl});
	points.push_back({xb, yb});
	
	for(int i = 0; i < N; i++) {
		int x, y; cin >> x >> y;
		x_coords_set.insert(x);
		y_coords_set.insert(y);
		points.push_back({x, y});
	}

	vector<int> x_coords;
	vector<int> y_coords;
	for(int x : x_coords_set) x_coords.push_back(x);
	for(int y : y_coords_set) y_coords.push_back(y);

	sort(x_coords.begin(), x_coords.end());
	sort(y_coords.begin(), y_coords.end());

	xl = lower_bound(x_coords.begin(), x_coords.end(), xl) - x_coords.begin();
	yl = lower_bound(y_coords.begin(), y_coords.end(), yl) - y_coords.begin();
	xb = lower_bound(x_coords.begin(), x_coords.end(), xb) - x_coords.begin();
	yb = lower_bound(y_coords.begin(), y_coords.end(), yb) - y_coords.begin();
	
	vector<pair<int, int>> points2;
	for(int i = 0; i < (int) points.size(); i++) {
		int x = points[i].first, y = points[i].second;
		x = lower_bound(x_coords.begin(), x_coords.end(), x) - x_coords.begin();
		y = lower_bound(y_coords.begin(), y_coords.end(), y) - y_coords.begin();
		points_x[y].push_back(x);
		points_y[x].push_back(y);
		points2.push_back({x, y});
	}
	sort(points2.begin(), points2.end());

	queue<tuple<pair<int, int>, int, int>> q; // point, direction, distance
	for(int y : points_y[xl]) {
		if(y != yl) {
			q.push(make_tuple(make_pair(xl, y), 0, 0));
		}
	}
	for(int x : points_x[yl]) {
		if(x != xl) {
			q.push(make_tuple(make_pair(x, yl), 1, 0));
		}
	}
	while(!q.empty()) {
		tuple<pair<int, int>, int, int> t = q.front();
		q.pop();
		int cx = get<0>(t).first, cy = get<0>(t).second;
		int new_dir = get<1>(t); new_dir = !new_dir;
		int dist = get<2>(t);
		int loc = lower_bound(points2.begin(), points2.end(), make_pair(cx, cy)) - points2.begin();
		vis[loc][!new_dir] = true;
		
		if(cx == xb && cy == yb) {
			cout << dist << '\n';
			exit(0);
		}

		if(new_dir == 0) {
			for(int y : points_y[cx]) {
				int loc = lower_bound(points2.begin(), points2.end(), make_pair(cx, y)) - points2.begin();
				if(y != cy && !vis[loc][new_dir]) {
					q.push(make_tuple(make_pair(cx, y), new_dir, dist + 1));
				}
			}
		} else {
			for(int x : points_x[cy]) {
				int loc = lower_bound(points2.begin(), points2.end(), make_pair(x, cy)) - points2.begin();
				if(x != cx && !vis[loc][new_dir]) {
					q.push(make_tuple(make_pair(x, cy), new_dir, dist + 1));
				}
			}
		}
	}

	cout << "-1\n";
}
