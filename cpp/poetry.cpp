// LICENSE: CC0
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

ll MOD = 1e9 + 7;
ll ways[5005]; // ways[i]: number of ways to get a sum of i
ll ways_end[5005]; // ways_end[i]: ways to get a sum of K ending with class of i
ll ways_group[100005]; // ways_group[i]: ways to assign lines to a group of size i where the ending must be the same
int N, M, K;
int length[5005];
int rc[5005]; // rhyme class
unordered_map<char, int> sz; // size of each group

ll modpow(ll a, ll b) { // a ^ b
	if(b == 0) return 1;
	ll u = modpow(a, b / 2);
	ll ans = u * u;
	ans %= MOD;
	if(b % 2 == 1) {
		ans *= a;
		ans %= MOD;
	}
	return ans;
}

int main() {
	freopen("poetry.in", "r", stdin);
	freopen("poetry.out", "w", stdout);
	cin >> N >> M >> K;
	for(int i = 0; i < N; i++) {
		cin >> length[i] >> rc[i];
	}
	for(int i = 0; i < M; i++) {
		char e; cin >> e;
		sz[e]++;
	}
	ways[0] = 1;
	for(int i = 1; i <= K; i++) {
		for(int j = 0; j < N; j++) {
			if(i - length[j] >= 0) {
				ways[i] += ways[i - length[j]];
				ways[i] %= MOD;
			}
		}
	}
	for(int i = 0; i < N; i++) {
		if(K - length[i] >= 0) {
			ways_end[rc[i]] += ways[K - length[i]];
			ways_end[rc[i]] %= MOD;
		}
	}
	unordered_set<int> sizes;
	for(unordered_map<char, int>::iterator it = sz.begin(); it != sz.end(); it++) {
		sizes.insert(it->second);
	}
	for(int s : sizes) {
		for(int j = 1; j <= N; j++) {
			ways_group[s] += modpow(ways_end[j], s);
			ways_group[s] %= MOD;
		}
	}
	ll ans = 1;
	for(unordered_map<char, int>::iterator it = sz.begin(); it != sz.end(); it++) {
		ans *= ways_group[it->second];
		ans %= MOD;
	}
	cout << ans << '\n';
}
