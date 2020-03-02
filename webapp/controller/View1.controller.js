sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox"
], function (Controller, JSONModel, MessageBox) {
	"use strict";

	return Controller.extend("Ders004.controller.View1", {

		onInit: function () {

			this._oView = this.getView();

			var oViewModel = new JSONModel({
				PoNumber: "",
				Lifnr: "",
				Waers: "",
				Bukrs: ""
			});

			this._oView.setModel(oViewModel, "viewModel");
			this._oTable = this._oView.byId("table0");

		},

		onAddPurchaseOrder: function () {
 
			debugger;   

			var oModel = this._oView.getModel(),
				sPath = "/PurchaseOrderSet",
				oData = {},
				mParameters = {};
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;

			oData.Ponumber = this._oView.getModel("viewModel").getProperty("/PoNumber");
			oData.Lifnr = this._oView.getModel("viewModel").getProperty("/Lifnr");
			oData.Waers = this._oView.getModel("viewModel").getProperty("/Waers");
			oData.Bukrs = this._oView.getModel("viewModel").getProperty("/Bukrs");

			mParameters.success = function (oData2, oResponse) {
				debugger;
				var oBinding = this._oTable.getBinding("items");
				oBinding.filter([]);

				MessageBox.success(
					"Satınalma Kaydı Başarılı!", {
						styleClass: bCompact ? "sapUiSizeCompact" : ""
					}
				);

			}.bind(this);
			mParameters.error = function (oError) {
				debugger;
				MessageBox.error(
					"Satınalma Kaydı Oluşturulamadı!", {
						styleClass: bCompact ? "sapUiSizeCompact" : ""
					}
				);
			};

			oModel.create(sPath, oData, mParameters);

		}

	});

});