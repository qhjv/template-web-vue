import financeService from '@/services/finance.service';

import {SUM_FIELDS_AUDIT, SUB_FIELDS_AUDIT} from '@/contants/finance';

const financeModule = {
  namespaced: true,
  state: {
    lastAuditData: null,
    nextAuditData: {},
    listPkgs: null,
    auditBills: null,
    detailById: {},
    loading: true,
    vatBillData: {
      page_data: [],
      pagination: {},
      count_status: {},
    },
    vatBillStatus: [
      // { key: "all", title: "Tất cả" },
      {key: 'draft', title: 'Chờ phát hành'},
      {key: 'expired', title: 'Quá hạn'},
      {key: 'canceled', title: 'Đã hủy'},
      {key: 'released', title: 'Đã phát hành'},
      {key: 'failed', title: 'Phát hành lỗi'},
    ],
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setNextAuditData(state, payload) {
      state.lastAuditData = state.nextAuditData;
      state.nextAuditData = payload;
      if (!state.listPkgs) {
        const _listPkgs = payload.list_pkgs || {};
        _listPkgs.store_fee = _listPkgs.store || 0;
        _listPkgs.insurance_fee = _listPkgs.insurance || 0;
        _listPkgs.change_address_fee = _listPkgs.change_address || 0;
        _listPkgs.return_fee = _listPkgs.return || 0;
        _listPkgs.sale_off = _listPkgs.discount_ids || 0;
        state.listPkgs = _listPkgs;
      }
    },
    setAuditBills(state, payload) {
      state.auditBills = payload;
    },
    setVatBillData(state, payload) {
      state.vatBillData = payload;
    },
    updateDetail(state, payload) {
      const id = String(payload.id);

      state.detailById[id] = {
        ...(state.detailById[id] || {}),
        ...payload,
      };
    },
  },
  actions: {
    async getBillDetail({commit}, payload) {
      commit('updateDetail', {id: payload.id, is_loading_get_detail: true});
      let detailInfo = {id: payload.id};

      try {
        const response = await financeService.getBillDetail({
          id: payload.id,
        });

        const packages = [];

        const responseData = response.data.data;

        if (responseData) {
          const listPackgages = responseData.packages || [];
          for (const p of listPackgages) {
            if (p.Package) {
              const packageItem = p.Package;
              packages.push(packageItem);
              for (const sumField of SUM_FIELDS_AUDIT) {
                if (!detailInfo[sumField.key]) {
                  detailInfo[sumField.key] = 0;
                }
                detailInfo[sumField.key] += packageItem[sumField.key] ?
                  Math.abs(Number(packageItem[sumField.key])) :
                  0;
              }
              for (const subField of SUB_FIELDS_AUDIT) {
                // get debt_money, transfer_fee from outside
                if (
                  subField.key === 'debt_money' ||
                  subField.key === 'transfer_fee'
                ) {
                  continue;
                }
                if (!detailInfo[subField.key]) {
                  detailInfo[subField.key] = 0;
                }
                detailInfo[subField.key] += packageItem[subField.key] ?
                  Math.abs(Number(packageItem[subField.key])) :
                  0;
              }
            }

            if (responseData.debt_money) {
              detailInfo.debt_money = Math.abs(responseData.debt_money);
            }

            if (responseData.transfer_fee) {
              detailInfo.transfer_fee = Math.abs(responseData.transfer_fee);
            }
          }

          detailInfo = {
            ...detailInfo,
            ...responseData,
          };
        }

        detailInfo.packages = packages;
      } catch (error) {
        console.log(error);
      }

      commit('updateDetail', {
        ...detailInfo,
        is_loading_get_detail: false,
        loaded_detail_success,
      });
    },
    async getAuditHistory({commit}, payload) {
      try {
        const response = await financeService.getAuditHistory(payload);

        let bills = [];

        if (!payload.type || payload.type === 'all') {
          bills = response.data.data.list_all_bill || [];
        } else if (payload.type === 'refund') {
          bills = response.data.data.his_audit_refund.list || [];
        } else if (payload.type === 'debt') {
          bills = response.data.data.his_audit_debt.list || [];
        } else if (payload.type === 'audit') {
          bills = response.data.data.his.list || [];
        }

        commit('setAuditBills', bills);
      } catch (error) {
        console.log(error);
      }
    },
  },
};

export default financeModule;
